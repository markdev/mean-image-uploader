var Contest 		= require('mongoose').model('Contest')
  , ArchivedContest = require('mongoose').model('ArchivedContest')
  , Entry 			= require('mongoose').model('Entry')
  , Result 			= require('mongoose').model('Result')
  , mongoose 		= require('mongoose')
  , fs 				= require('fs')
  , rootDir  		= require('../config').rootDir
  , exec 			= require('child_process').exec
  ;

var bannerDestination = 'public/img/contestBanners/';
var entryDestination = 'public/img/contestEntries/';
var entryThumbDestination = 'public/img/contestEntryThumbs/';


exports.create = function(req, res, next) {
	console.log("called: contests.create");
	var userData = req.body;
	userData._owner = req.user._id
	console.log(req.files.file.name);
	userData.banner = req.files.file.name;
	Contest.create(userData, function(err, contest) {
		if (err) {
			res.send({success: false, error: err});
		} else {
			contest.banner = req.files.file.name;
			console.log("CONTEST BANNER IS:");
			console.log(contest.banner)
			fs.rename('images/tmp/' + contest.banner, bannerDestination + contest.banner, function (err) {
				console.log("Image has been moved");
				exec('convert ' + bannerDestination + contest.banner + ' -resize 50x50 ' + bannerDestination + contest.banner, function(err, stdout, stderr) {
					console.log("AVATAR RESIZING WITH IMAGEMAGICK");
				})
			});
			res.send({success: true, contest: contest});
		}
	});
}

exports.edit = function(req, res, next) { // TODO this doesn't do anything useful yet
	console.log("called: contests.edit");
	var contestData = req.body;
	console.log(contestData);
	Contest.findByIdAndUpdate(
		contestData._id,
		{$set: {
			"title": contestData.title,
			"tags": contestData.tags
		}},
		{safe: true, upsert: true},
		function(err, contest) {
			if (err) {
				res.send({success: false, message: "Error inserting score"});
			} else {
				res.send({success: true, contest: contest});
			}
		}	
	)
}

exports.deleteContest = function(req, res, next) {
	console.log("called: contests.deleteContest");
	Contest.findOne({_id: req.param('id')}, function(err, contest) {
		//delete the banner
		if (contest.banner !== null) {
			console.log("deleting banner: " + contest.banner);
			fs.unlink(bannerDestination + contest.banner);
		}
		//now delete the document from mongo
		Contest.remove({'_id': req.param('id')}, function(err) {
			if (err) {
				res.send({ success: false, message: "No contest with that id."});
			} else {
				res.send({ success: true });
			}		
		});
	})
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

exports.getByTagOrName = function(req, res, next) {
	console.log("called: contests.getByTagOrName");
	var re = new RegExp(req.param('str'), 'i');
	Contest.find({ 
		$or: [
			{tags: { $in: [req.param('str')] }},
			{title: {$regex: re}}
			]}, function(err, contests) {
		if (err) {
			res.send({ success: false, message: "No contests with that tag or name."});
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

exports.getByCompetitorSubmittable = function(req, res, next) {
	console.log("called: contests.getByCompetitorSubittable");
	Entry.find( 
		{_owner: mongoose.Types.ObjectId(req.param('slug'))}, 
		{contest : 1}, 
			function(err, entries) {
				console.log(entries);
				var entryArray = [];
				for (var i = 0; i<entries.length; i++) {
					entryArray[entryArray.length] = entries[i].contest;
				}
				Contest.find( { $and: [
					{ competitors: { $in: [mongoose.Types.ObjectId(req.param('slug'))] }},
					{ $or: [
						{ submissionLimit: 'many' },
						{ _id : { $nin: entryArray }} //doesn't have an entry by that user.
						]}
					]}, function(err, contests) {
					if (err) {
						res.send({ success: false, message: "No contests with that tag."});
					} else {
						res.send({ success: true, contests: contests });
					}
				});
			}
	);
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

exports.addCompetitor = function(req, res, next) {
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

exports.addJudge = function(req, res, next) {
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
	var entryName = req.files.file.name;

	fs.rename('images/tmp/' + entryName, entryDestination + entryName, function (err) {
		console.log("Image has been moved");
		exec('convert ' + entryDestination + entryName + ' -resize 400x400 ' + entryDestination + entryName, function(err, stdout, stderr) {
			console.log("ENTRY RESIZING WITH IMAGEMAGICK");
		})
	});

	fs.createReadStream(entryDestination + entryName).pipe(fs.createWriteStream(entryThumbDestination + entryName));
	exec('convert ' + entryThumbDestination + entryName + ' -resize 50x50 ' + entryThumbDestination + entryName, function(err, stdout, stderr) {
		console.log("ENTRY RESIZING WITH IMAGEMAGICK");
	})
	var entryData = {};
	entryData._owner = req.user._id;
	entryData.contest = req.body.contest;
	entryData.title = req.body.title;
	entryData.content = entryName;
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


exports.getBanner = function(req, res, next) {
	Contest.findOne({_id: req.param('id')}, function(err, contest) {
		console.log("contest banner:");
		if (err || contest == null || contest.banner == null) {
			res.sendFile(rootDir + bannerDestination + 'blankBanner.png');
		} else {
			res.sendFile(rootDir + bannerDestination + contest.banner);
		}
	})
}

//I dont think this is being called anymore
/*
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
				exec('convert ' + bannerDestination + contest.banner + ' -resize 50x50 ' + bannerDestination + contest.banner, function(err, stdout, stderr) {
					console.log("AVATAR RESIZING WITH IMAGEMAGICK");
				})
		//		lwip.open(bannerDestination + contest.banner, function(err, image) {
		//			if (err) throw err;
		//			// lanczos
		//			image.resize(50, 50, function(err, rzdImg) {
		//				rzdImg.writeFile(bannerDestination + contest.banner, function(err) {
		//					if (err) throw err;
		//				});
		//			});
		//		});
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
*/

exports.getJudgeState = function(req, res, next) {
	Contest.findOne({_id: req.param('contest')}, function(err, contest) {
		//cannot
		if (contest.judging != "public") {
			console.log("judging: cannot");
			res.send({success: true, state: "cannot"});
		//can
		} else if (contest.judging == "public" 
			&& contest.judges.indexOf(req.param('user')) === -1) {
			console.log("judging: can");
			res.send({success: true, state: "can"});
		//already
		} else if (contest.judges.indexOf(req.param('user')) !== -1) { 
			console.log("judging: already");
			res.send({success: true, state: "already"});			
		}
	});
}

exports.getCompeteState = function(req, res, next) {
	Contest.findOne({_id: req.param('contest')}, function(err, contest) {
		//cannot
		if (true) {
			console.log("competing: cannot");
			res.send({success: true, state: "cannot"});		
		//can
		} else if (true) {
			console.log("competing: can");
			res.send({success: true, state: "can"});
		//already
		} else if (contest.competitors.indexOf(req.param('user')) !== -1) {
			console.log("competing: already");
			res.send({success: true, state: "already"});
		}
	});
}

