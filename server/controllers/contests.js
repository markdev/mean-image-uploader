var Contest = require('mongoose').model('Contest')
  , Entry = require('mongoose').model('Entry')
//  , Rating = require('mongoose').model('Rating')
  , mongoose = require('mongoose')
//  , fs = require('fs')
//  , util = require('util')
//  , lwip = require('lwip')
//  , nodemailer = require('nodemailer');
  ;


exports.create = function(req, res, next) {
	console.log("called: contests.create");
	var userData = req.body;
	//userData.owner = req.user._id
	Contest.create(userData, function(err, contest) {
		if (err) {
			res.send({success: false, error: err});
		} else {
			res.send({success: true, contest: contest});
		}
	});
}

exports.edit = function(req, res, next) {
	console.log("called: contests.edit");
	res.send({ success: true });
}

exports.getBySlug = function(req, res, next) {
	console.log("called: contest.getBySlug");
	Contest.findOne({"_id" : req.param('slug')}, function(err, contest) {
		if (err) {
			res.send({ success: false, message: "No contest with that id."});
		} else {
			res.send({ success: true, contest: contest });
		}
	});
}

exports.getByNameStr = function(req, res, next) {
	console.log("called: contests.getByNameStr");
	var re = new RegExp(req.param('str'), 'i');
	Contest.find({title: {$regex: re}}, function(err, contests) {
		if (err) {
			res.send({ success: false, message: "No contests with that tag."});
		} else {
			res.send({ success: true, contests: contests });
		}
	});
}

exports.getByTag = function(req, res, next) {
	console.log("called: contests.getByTag");
	Contest.find({ tags: { $in: [req.param('tag')] }}, function(err, contests) {
		if (err) {
			res.send({ success: false, message: "No contests with that tag."});
		} else {
			res.send({ success: true, contests: contests });
		}
	});
}

exports.getByUser = function(req, res, next) {
	console.log("called: contests.getByUser");
	Contest.find({ tags: { $in: [req.param('slug')] }}, function(err, contests) {
		if (err) {
			res.send({ success: false, message: "No contests with that tag."});
		} else {
			res.send({ success: true, contests: contests });
		}
	});
}

exports.getByCompetitor = function(req, res, next) {
	console.log("called: contests.getByCompetitor");
	Contest.find({ competitors: { $in: [mongoose.Types.ObjectId(req.param('slug'))] }}, function(err, contests) {
		if (err) {
			res.send({ success: false, message: "No contests with that tag."});
		} else {
			res.send({ success: true, contests: contests });
		}
	});
}

exports.getByJudge = function(req, res, next) {
	console.log("called: contests.getByJudge");
	Contest.find({ judges: { $in: [mongoose.Types.ObjectId(req.param('slug'))] }}, function(err, contests) {
		if (err) {
			res.send({ success: false, message: "No contests with that tag."});
		} else {
			res.send({ success: true, contests: contests });
		}
	});
}

exports.endContest = function(req, res, next) {
	console.log("called: contests.endContest");
	res.send({ success: true, slug: req.param('slug') });
}

exports.compete = function(req, res, next) {
	console.log("called: contests.compete");
	Contest.findByIdAndUpdate(
		req.body.contest,
		{ $push: {"competitors": {"_id": mongoose.Types.ObjectId(req.body.user)}}},
		{safe: true, upsert: true},
		function(err, contest) {
			if (err) {
				res.send({success: false, message: "Error inserting data"});
			} else {
				res.send({success: true});
			}
		}
	);
}

exports.judge = function(req, res, next) {
	console.log("called: contests.judge");
	Contest.findByIdAndUpdate(
		req.body.contest,
		{ $push: {"judges": {"_id": mongoose.Types.ObjectId(req.body.user)}}},
		{safe: true, upsert: true},
		function(err, contest) {
			if (err) {
				res.send({success: false, message: "Error inserting data"});
			} else {
				res.send({success: true});
			}
		}
	);
}
/*
exports.addEntry = function(req, res, next) {
	console.log("called: contests.addEntry");
	Contest.findByIdAndUpdate(
		req.body.contest,
		{ $push: {"entries": {
			//  "_owner": mongoose.Types.ObjectId(req.body.user)
			 "content": req.body.content // change this later
		}}},
		{safe: true, upsert: true},
		function(err, contest) {
			if (err) {
				res.send({success: false, message: "Error inserting data"});
			} else {
				res.send({success: true});
			}
		}
	)	
}
*/
exports.addEntry = function(req, res, next) {
	console.log("called: contests.addEntry");
	var entryData = {};
	entryData.content = req.body.content;
	Entry.create(entryData, function(err, entry) {
		if (err) {
			res.send({success: false, error: err});
		} else {
			var eId = entry.id;
			Contest.findByIdAndUpdate(
				req.body.contest,
				{ $push: { "entries": eId }},
				{ safe: true, upsert: true},
				function(err, contest) {
					if (err) {
						res.send({success: false, message: "Error inserting data"});
					} else {
						res.send({success: true, contest: contest});
					}					
				}
			);
		}
	});
}


exports.addRating = function(req, res, next) {
	console.log("called: contests.addRating");
	Entry.findByIdAndUpdate(
		req.body.entry,
		{ $push: {"ratings": {
			"owner": req.body.user,
			"score": req.body.score
		}}},
		{safe: true, upsert: true},
		function(err, entry) {
			if (err) {
				res.send({success: false, message: "Error inserting score"});
			} else {
				res.send({success: true, entry: entry});
			}
		}		
	);
}

	/*
	Contest.findByIdAndUpdate(
		req.body.contest,
		{ $push: {"entries[0].ratings": {
			"score": req.body.score
		}}},
		{safe: true, upsert: true},
		function(err, contest) {
			if (err) {
				res.send({success: false, message: "Error inserting data"});
			} else {
				res.send({success: true});
			}
		}
	)
	*/


/*
exports.addEntry = function(req, res, next) {
	console.log("called: contests.addEntry");
	Contest.findByIdAndUpdate(
		req.body.contest,
		{ $push: {"entries": {
			  "_owner": mongoose.Types.ObjectId(req.body.user)
			, "content": req.body.content // change this later
		}}},
		{safe: true, upsert: true},
		function(err, contest) {
			if (err) {
				res.send({success: false, message: "Error inserting data"});
			} else {
				res.send({success: true});
			}
		}
	)	
}
*/

/*
exports.addEntry = function(req, res, next) {
	console.log("called: contests.addEntry");
	Contest.findOne({"_id" : req.body.contest}, function(err, contest) {
		contest.entries.push({content: req.body.content});
		Contest.save()
		res.send(contest.entries);
	});	
}
*/
/*
exports.addRating = function(req, res, next) {
	console.log("called: contests.addRating");
	Contest.findOne({"_id" : req.body.contest}, function(err, contest) {
		//res.send("addRating");
		var entry = contest.entries.id(req.body.entry);
		//console.log(rating);
		//res.send(entry.entry.ratings);
		entry.entry.ratings.push({ rating: {score: 9} });
		entry.entry.ratings.save();
		res.send(entry.entry.ratings);
		//entry.ratings.push({ rating: {score: 9} });
		*/
		/*
		contest.entries.findByIdAndUpdate(
			req.body.entry,
			{ $push: {"ratings": {
				  "_owner": mongoose.Types.ObjectId(req.body.user)
				, "score": req.body.score
			}}},
			{safe: true, upsert: true},
			function(err, contest) {
				if (err) {
					res.send({success: false, message: "Error inserting data"});
				} else {
					res.send({success: true});
				}
			}
		);
*/
//	});
//}












