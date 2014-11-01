var Contest = require('mongoose').model('Contest')
//  , fs = require('fs')
//  , util = require('util')
//  , lwip = require('lwip')
//  , nodemailer = require('nodemailer');
  ;


exports.create = function(req, res, next) {
	console.log("called: contests.create");
	res.send({ success: true });
}

exports.edit = function(req, res, next) {
	console.log("called: contests.edit");
	res.send({ success: true });
}

exports.getBySlug = function(req, res, next) {
	console.log("called: contests.getBySlug");
	res.send({ success: true, slug: req.param('slug') });
}

exports.getByNameStr = function(req, res, next) {
	console.log("called: contests.getByNameStr");
	res.send({ success: true, str: req.param('str') });
}

exports.getByTag = function(req, res, next) {
	console.log("called: contests.getByTag");
	res.send({ success: true, tag: req.param('tag') });
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
