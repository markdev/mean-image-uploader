var Contest = require('mongoose').model('Contest')
  , Entry = require('mongoose').model('Entry')
//  , Rating = require('mongoose').model('Rating')
  , mongoose = require('mongoose')
  , fs = require('fs')
//  , util = require('util')
  , lwip = require('lwip')
//  , nodemailer = require('nodemailer');
  ;

var bannerDestination = 'public/img/contestBanners/';

exports.create = function(req, res, next) {
	console.log("called: contests.create");
	var userData = req.body;
	userData._owner = req.user._id
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

exports.getByOwner = function(req, res, next) {
	console.log("called: contest.getByOwner");
	Contest.find({"_owner" : req.param('id')}, function(err, contests) {
		if (err) {
			res.send({ success: false, message: "No contest with that owner."});
		} else {
			res.send({ success: true, contests: contests });
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

exports.uploadBanner = function(req, res, next) {
	console.log("called: users.uploadBanner");
	Contest.findOne({_id: req.body.id}, function(err, contest) {
		if (err) {
			// stuff
		} else {
			if (contest.banner !== null && contest.banner !== undefined) {
				console.log("banner is: " + contest.banner);
				fs.unlink(bannerDestination + contest.banner);
			}
			contest.banner = req.files.file.name;
			fs.rename('images/tmp/' + contest.banner, bannerDestination + contest.banner, function (err) {
				console.log("Image has been moved");
				lwip.open(bannerDestination + contest.banner, function(err, image) {
					if (err) throw err;
					// lanczos
					image.resize(50, 50, function(err, rzdImg) {
						rzdImg.writeFile(bannerDestination + contest.banner, function(err) {
							if (err) throw err;
						});
					});
				});
			});
			contest.save(function(err) {
				if (err) {
					res.send({success: false, message: "Failed to update avatar"});
				} else {
					res.send({success: true, contest: contest});
				}
			})			
		} 
	})
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

