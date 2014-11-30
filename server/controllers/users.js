var User 		= require('mongoose').model('User')
  , fs 			= require('fs')
  , os 			= require('os')
  , util 		= require('util')
  , lwip 		= require('lwip')
  , nodemailer 	= require('nodemailer')
  , passport 	= require('passport')
  , exec 		= require('child_process').exec
  , rootDir  	= require('../config').rootDir
  ;

var avatarDestination = 'public/img/avatars/';

exports.login = function(req, res, next) {
	console.log("DEBUG 1");
	req.body.email = req.body.email.toLowerCase();
	passport.authenticate('local', function(err, user) {
		console.log("DEBUG 4");
		if(err) {
			res.send({success:false, message: "Error authenticating user."});
		}
		if(!user) {
			res.send({success:false, message: "Matching user not found."});
		}
		req.logIn(user, function(err) {
			if(err) {return next(err);}
			res.send({success:true, user: user});
			//res.redirect('/login');
		});
	})(req, res, next);
}

exports.logout = function(req, res, next) {
	req.logout();
	res.end();
}


exports.create = function(req, res, next) {
	console.log("called: users.create");
	var userData = req.body;
	console.log(userData);
	if (userData.password !== userData.password2) {
    	res.send({success: false, message: "Passwords do not match."});		
	} else {
		userData.password_salt = User.createPasswordSalt();
		console.log("Salt: " + userData.password_salt);
		console.log("Password: " + userData.password)
    	userData.password_hash = User.hashPassword(userData.password_salt, userData.password);
		User.create(userData, function(err, user) {
			if(err) {
				if(err.toString().indexOf('E11000') > -1) {
					err = new Error('Duplicate Email');
				}
				res.send({success: false, message: "Email is already in use."});	
			}
			req.logIn(user, function(err) {
				if(err) {
					return next(err);
				} else {
					res.send({ success: true, user: user });
				}
			});
		});
	}
}

//list all users
//  - security breach, don't show passwords
exports.list = function(req, res, next) {
	console.log("called: users.list");
	User.find({}, {'_id': 0, 'password_salt': 0, 'password_hash': 0}, function (err, users) {
		if (err) {
			res.send({ success: false, message: "Can't find users"});
		} else {
			res.send({ success: true, users: users });
		}
	});
}


exports.getAvatar = function(req, res, next) {
	User.findOne({_id: req.param('id')}, function(err, user) {
		if (err || user == null || user.avatar == null) {
			res.sendFile(rootDir + avatarDestination + 'blankAvatar.png');
		} else {
			res.sendFile(rootDir + avatarDestination + user.avatar);
		}
	})
}

exports.getBySlug = function(req, res, next) {
	console.log("called: users.getBySlug");
	User.findOne({"_id" : req.param('slug')}, function(err, user) {
		if (err) {
			res.send({ success: false, message: "No email with that id."});
		} else {
			res.send({ success: true, user: user });
		}
	});
}

exports.changePassword = function(req, res, next) {
	console.log("called: users.changePassword");
	User.findOne({email: req.body.email}, function(err, user) {
		if (err) {
			//stuff
		} else {
			user.password_hash = User.hashPassword(user.password_salt, req.body.password);
			user.updated = new Date();
			user.save(function(err) {
				if (err) {
					res.send({success: false, message: "Failed to update password"});
				} else {
					res.send({success: true, user: user});
				}
			})
		}
	});
}

exports.deleteUser = function(req, res, next) {
	console.log("called: users.deleteUser");
	User.findOne({_id: req.param('slug')}).remove(function() {
		res.send({ success: true });
	});
}

exports.updateUser = function(req, res, next) {
	console.log("called: users.updateUser");
	User.findOne({email: req.body.email}, function(err, user) {
		if (err) {
			//stuff
		} else {
		//	user.email = (req.body.email)? req.body.email : user.email;
			user.first_name = (req.body.first_name)? req.body.first_name : user.first_name;
			user.last_name = (req.body.last_name)? req.body.last_name : user.last_name;
			user.sex = (req.body.sex)? req.body.sex : user.sex;
			user.dob = (req.body.dob)? req.body.dob : user.dob;
			user.updated = new Date();
			user.save(function(err) {
				if (err) {
					res.send({success: false, message: "Failed to update user"});
				} else {
					res.send({success: true, user: user});
				}
			})
		}
	});
}

// lots of cleanup for this one
exports.uploadAvatar = function(req, res, next) {
	console.log("called: users.uploadAvatar");
	console.log("SFTP");
	User.findOne({_id: req.body.id}, function(err, user) {
		if (err) {
			console.log(req.body.id);
			console.log(err);
		} else {
			if (user.avatar !== null && user.avatar !== undefined) {
				console.log("avatar is: " + user.avatar);
				fs.unlink(avatarDestination + user.avatar);
			}
			user.avatar = req.files.file.name;
			fs.rename('images/tmp/' + user.avatar, avatarDestination + user.avatar, function (err) {
				console.log("Image has been moved");
				console.log(user.avatar);
				exec('convert ' + avatarDestination + user.avatar + ' -resize 50x50 ' + avatarDestination + user.avatar, function(err, stdout, stderr) {
					console.log("AVATAR RESIZING WITH IMAGEMAGICK");
				})
				/*
				lwip.open(avatarDestination + user.avatar, function(err, image) {
					if (err) throw err;
					// lanczos
					image.resize(50, 50, function(err, rzdImg) {
						rzdImg.writeFile(avatarDestination + user.avatar, function(err) {
							if (err) throw err;
						});
					});
				});
				*/
			});
			user.save(function(err) {
				if (err) {
					res.send({success: false, message: "Failed to update avatar"});
				} else {
					res.send({success: true, user: user});
				}
			})
		}
	});
}

exports.requestPasswordReset = function(req, res, next) {
	console.log("called: users.requestPasswordReset");
	var tempPassword = User.createRandomString();
	User.findOne({email: req.body.email}, function(err, user) {
		if (user !== null && !err) {
			var transporter = nodemailer.createTransport({
				service: 'Gmail',
				auth: {
					user: 'sunzora1@gmail.com',
					pass: 'sunzora83'
				}
			});
			var mailOptions = {
				from: 'Sunzora <mark@sunzora.com>', 
				to: req.body.email,
				subject: 'Password Reset',
				text: 'Your password is now ' + tempPassword,
				html: '<b>Your password is now ' + tempPassword + '</b>'
			};
			transporter.sendMail(mailOptions, function(error, info){
				if(error){
					console.log(error);
				}else{
					console.log('Message sent: ' + info.response);
				}
			});						
			user.password_hash = User.hashPassword(user.password_salt, tempPassword);
			user.updated = new Date();
			user.save(function(err) {
				if (err) {
					res.send({success: false, message: "Failed to update password"});
				} else {
					res.send({success: true, user: user});
				}
			})
		} else {
			res.send({success: false, message: "Email address is not listed"});
		}
	})
}


