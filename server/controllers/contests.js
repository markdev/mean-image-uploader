var Contest = require('mongoose').model('Contest')
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
	res.send({ success: true, slug: req.param('slug') });
}

exports.getByCompetitor = function(req, res, next) {
	console.log("called: contests.getByCompetitor");
	res.send({ success: true, slug: req.param('slug') });
}

exports.getByJudge = function(req, res, next) {
	console.log("called: contests.getByJudge");
	res.send({ success: true, slug: req.param('slug') });
}

exports.endContest = function(req, res, next) {
	console.log("called: contests.endContest");
	res.send({ success: true, slug: req.param('slug') });
}

exports.compete = function(req, res, next) {
	console.log("called: contests.compete");
	res.send({ success: true, slug: req.param('slug') });
}

exports.judge = function(req, res, next) {
	console.log("called: contests.judge");
	res.send({ success: true, slug: req.param('slug') });
}
