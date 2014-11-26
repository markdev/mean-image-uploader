var Entry = require('mongoose').model('Entry')
//  , fs = require('fs')
//  , util = require('util')
//  , lwip = require('lwip')
//  , nodemailer = require('nodemailer');
  ;

var entryDestination = 'public/img/contestEntries/';
var entryThumbDestination = 'public/img/contestEntryThumbs/';

exports.getByUser = function(req, res, next) {
	console.log("called: getByUser");
	Entry.find({"_owner" : req.param('id')}, function(err, entries) {
		if (err) {
			res.send({ success: false, message: "No entries for this user."});
		} else {
			res.send({ success: true, entries: entries });
		}
	});
}

exports.getThumb = function(req, res, next) {
	console.log("called: getThumb");
	Entry.findOne({_id: req.param('id')}, function(err, entry) {
		console.log("entry banner:");
		//console.log(entry);
		if (err || entry == null) {
			res.sendfile(entryThumbDestination + 'blankThumb.png');
		} else {
			res.sendfile(entryThumbDestination + entry.content);
		}
	})
}

exports.getContent = function(req, res, next) {
	console.log("called: getContent");
	Entry.findOne({_id: req.param('id')}, function(err, entry) {
		console.log("entry banner:");
		//console.log(entry);
		if (err || entry == null) {
			res.sendfile(entryDestination + 'blankThumb.png');
		} else {
			res.sendfile(entryDestination + entry.content);
		}
	})
}

exports.getByContest = function(req, res, next) {
	console.log("called: getByContest");
	Entry.find({contest: req.param('id')}, function(err, entries) {
		if (err) {
			res.send({ success: false, message: "No entries for this user."});
		} else {
			res.send({ success: true, entries: entries });
		}
	})
}

exports.loadNewEntry = function(req, res, next) {
	console.log("called: entry.loadNewEntry");
	console.log(req.body);
	Entry.findOne({ // Need to find a way to randomize this
		  _id: { $nin: req.body.existingEntries }
		, contest: req.body.cId
		, $or: [
			  { ratings: [] }
			, { "ratings._owner" : {$ne: req.user._id}}
			]
	}, function(err, entry) {
		if (err) {
			res.send({ success: false, message: "No entries for this contest."});
		} else {
			res.send({ success: true, entry: entry });
		}
	})
}

exports.addRating = function(req, res, next) {
	console.log("called: entry.addRating");
	Entry.update(
		{
			"_id": req.body.eId,
			"ratings._owner": req.user._id
			//"ratings._owner": req.body.uId
		},
		{
			"$set": {
				"ratings.$.score": req.body.score
			}
		},
		function(err, numAffected) {
			if (numAffected == 0) {
				console.log("Nothing there yet, now inserting");
				Entry.update(
					{
						"_id": req.body.eId,
					},
					{
						"$push": {
							"ratings": {
								"_owner": req.user._id,
								//"_owner": req.body.uId,
								"score": req.body.score
							}
						}
					},
					function(err, numAffected) {
						res.send({ success: true, entry: numAffected });
					}
				)
			} else {
				res.send({ success: true, entry: numAffected });
			}
		}
	);
}

exports.getStandingsByEntry = function(req, res, next) {
	console.log("called: entry.getStandingsByEntry");
	var entryScores = [];
	Entry.findOne(
		{
			"_id": req.param('eId')
		}, 
		{
			"contest": 1,
		}, 
		function(err, entry) {
			var cId = entry.contest;
			Entry.find(
				{
					"contest": cId
				},
				function(err, entries) {
					console.log("LENGHT");
					console.log(entries.length);
					for (var i=0; i<entries.length; i++) {
					//	console.log("THE TITLE IS");
					//	console.log(entries[entry]);
						var entryObj = {};
						entryObj._id = entries[i]._id;
						entryObj.title = entries[i].title;
						entryObj.score = 4;
						entryObj.votes = 5;
						entryScores.push(entryObj);
					}
					res.send({ success: true, entries: entryScores});
				}
			)
		}
	)
	/*
		var entries = [
			{
				"_id": "5472e952844331e07d7da3a9",
				"title": "My Title",
				"score": 9.32,
				"votes": 45
			},
			{
				"_id": "5472e8d0ad36ff4d7d5c7b6d",
				"title": "Castle",
				"score": 8.28,
				"votes": 67
			},
			{
				"_id": "5472ea93fb2e02307f72d291",
				"title": "Other title",
				"score": 6.74,
				"votes": 3
			}
		];
	*/

}