var Contest = require('mongoose').model('Contest')
//  , fs = require('fs')
//  , util = require('util')
//  , lwip = require('lwip')
//  , nodemailer = require('nodemailer');
  ;


exports.create = function(req, res, next) {
	console.log("called: contests.create");
}

exports.edit = function(req, res, next) {
	console.log("called: contests.edit");
}

exports.getBySlug = function(req, res, next) {
	console.log("called: contests.getBySlug");
}

exports.getByNameStr = function(req, res, next) {
	console.log("called: contests.getByNameStr");
}

exports.getByTag = function(req, res, next) {
	console.log("called: contests.getByTag");
}

exports.getByUser = function(req, res, next) {
	console.log("called: contests.getByUser");
}

exports.getByCompetitor = function(req, res, next) {
	console.log("called: contests.getByCompetitor");
}

exports.getByJudge = function(req, res, next) {
	console.log("called: contests.getByJudge");
}

exports.endContest = function(req, res, next) {
	console.log("called: contests.endContest");
}

