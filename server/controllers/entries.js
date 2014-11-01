var Entry = require('mongoose').model('Entry')
//  , fs = require('fs')
//  , util = require('util')
//  , lwip = require('lwip')
//  , nodemailer = require('nodemailer');
  ;


exports.submit = function(req, res, next) {
	console.log("called: entries.submit");
	res.send({ success: true, data: req.body });
}
