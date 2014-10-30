var User = require('mongoose').model('User')
;

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

exports.changePassword = function(req, res) {
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
}

exports.requestPasswordReset = function(req, res) {
	console.log("requestPasswordReset");
	res.send("requestPasswordReset");
}

//list all users
//  - security breach, don't show passwords
exports.list = function(req, res) {
	console.log("list");
	res.send("list");
}

exports.deleteUser = function(req, res) {
	User.remove({"email": req.params.email}, function(err, results) {
		console.log(results);
		res.send(results);
	});
}

exports.updateUser = function(req, res) {
	console.log("updateUser");
	res.send("updateUser");
}


exports.uploadAvatar = function(req, res) {
	console.log("uploadAvatar");
	res.send("uploadAvatar");
}

exports.addLogin = function(req, res) {
	console.log("addLogin");
	res.send("addLogin");
}

//populate default users

