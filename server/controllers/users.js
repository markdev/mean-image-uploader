var User = require('mongoose').model('User')
;

exports.create = function(req, res) {
	console.log(req.body);
	var newUser = new User(req.body);
	newUser.save(function (err, results) {
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

exports.getBySlug = function(req, res) {
	User.findOne({}, function(err, results) {
		console.log(results);
		res.send(results);
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

exports.deleteUser = function(req, res) {
	User.remove({"email": req.params.email}, function(err, results) {
		console.log(results);
		res.send(results);
	});
}



