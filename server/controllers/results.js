var Result = require('mongoose').model('Result')
//  , fs = require('fs')
//  , util = require('util')
//  , lwip = require('lwip')
//  , nodemailer = require('nodemailer');
  ;

//var entryDestination = 'public/img/contestEntries/';
//var entryThumbDestination = 'public/img/contestEntryThumbs/';

exports.getByUser = function(req, res, next) {
	console.log("called: getByUser");
	/*
	var results = [
			{
				"_id" : "54758ec59defce4187b27b3b",
				"_owner" : "546afef99ea23d9bdd46e476",
				"entry" : "5472e97e828f71217ec3e0eb",
				"contest" : "5472e830538835e87bf7ceed",
				"deadline" : "2014-01-01T05:00:00Z",
				"score" : 0,
				"rank" : 69,
				"totalEntries" : 11,
				"totalVotes" : 2,
				"title" : "peacock"
			},
			{
				"_id" : "54758ec59defce4187b27b3a",
				"_owner" : "546afef99ea23d9bdd46e476",
				"entry" : "5472ebe0efab195e801b6536",
				"contest" : "5472e830538835e87bf7ceed",
				"deadline" : "2014-01-01T05:00:00Z",
				"score" : 0.5,
				"rank" : 69,
				"totalEntries" : 11,
				"totalVotes" : 2,
				"title" : "trickster fairie"
			},
		];
		res.send({ success: true, results: results });
	*/
	Result.find({"_owner" : req.param('id')}, function(err, results) {
		if (err) {
			res.send({ success: false, message: "No results for this user."});
		} else {
			res.send({ success: true, results: results });
		}
	});
}