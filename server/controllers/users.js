var User = require('mongoose').model('User')
//  , bodyParser = require('body-parser')
  , fs = require('fs')
  , util = require('util')
;

//list all users
//  - security breach, don't show passwords
exports.list = function(req, res, next) {
	User.find({}, {'_id': 0, 'password_salt': 0, 'password_hash': 0}, function (err, users) {
		if (err) {
			res.send({ success: false, message: "Can't find users"});
		} else {
			res.send({ success: true, users: users });
		}
	});
}

exports.create = function(req, res, next) {
	var userData = req.body;
	if (userData.password !== userData.password2) {
    	res.send({success: false, message: "Passwords do not match."});		
	} else {
		userData.password_salt = User.createPasswordSalt();
    	userData.password_hash = User.hashPassword(userData.password_salt, userData.password);
		User.create(userData, function(err, user) {
			if(err) {
				if(err.toString().indexOf('E11000') > -1) {
					err = new Error('Duplicate Username');
				}
				res.send({success: false, message: "Username is already in use."});	
			}
//			req.logIn(user, function(err) {
//				if(err) {
//					return next(err);
//				} else {
					res.send({ success: true, user: user });
//				}
//			});
		});
	}
}

exports.getBySlug = function(req, res, next) {
	User.findOne({"_id" : req.param('slug')}, function(err, user) {
		if (err) {
			res.send({ success: false, message: "No username with that id."});
		} else {
			res.send({ success: true, user: user });
		}
	});
}

//consider using the User.update() approach
/*
	User.update(
		{email: req.body.email}, 
		{$set: { password: req.body.password}}, 
		{upsert: true}, 
		function(err, results) {
			if (err) {
				console.error(err);
				//process.exit(1);
				res.send("error");
			} else {
				console.log('Saved: ', results);
				//process.exit(0);
				res.send("success!");
			}
		});
*/
exports.changePassword = function(req, res, next) {
	User.findOne({email: req.body.email}, function(err, user) {
		if(!err) {
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

exports.updateUser = function(req, res, next) {
	User.findOne({email: req.body.email}, function(err, user) {
		if(!err) {
			user.username = (req.body.username)? req.body.username : user.username;
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


exports.uploadAvatar = function(req, res, next) {
	console.log(util.inspect(req.files));
	res.send("Here it is " + req.files);

}


exports.deleteUser = function(req, res, next) {
	User.findOne({_id: req.param('slug')}).remove(function() {
		res.send({ success: true });
	});
}

exports.requestPasswordReset = function(req, res) {
	console.log("requestPasswordReset");
	res.send("requestPasswordReset");
}

/*
exports.addLogin = function(req, res) {
	console.log("addLogin");
	res.send("addLogin");
}
*/

//populate default users

