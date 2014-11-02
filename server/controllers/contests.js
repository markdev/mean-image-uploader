var Contest = require('mongoose').model('Contest')
//  , Entry = require('mongoose').model('Entry')
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

exports.addEntry = function(req, res, next) {
//	var entry1 = new Entry();
//	entry1.content = "lets try this"
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
/*
	Contest.findOne({_id: req.body.contest}, function(err, contest) {
		console.log(contest);
		contest.entries.push(entry1);
		contest.save();
		entry1.save();
		res.send("check shell");
	});
*/
}

