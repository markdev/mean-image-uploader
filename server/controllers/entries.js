var Entry = require('mongoose').model('Entry')
//  , fs = require('fs')
//  , util = require('util')
//  , lwip = require('lwip')
//  , nodemailer = require('nodemailer');
  ;

var entryDestination = 'public/img/contestEntries/';
var entryThumbDestination = 'public/img/contestEntryThumbs/';

exports.submit = function(req, res, next) {
	console.log("called: entries.submit");
	res.send({ success: true, data: req.body });
}

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
		console.log(entry);
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
		console.log(entry);
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