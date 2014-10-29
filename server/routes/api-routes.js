var mongoose = require('mongoose')
//  , passport = require('passport')
  , api = require('./route-config')
  ;

//init User model
var UserSchema = require('../models/User').User
  , User = mongoose.model('User')

console.log(api.users);

module.exports = function(app) {
	// Routes
	app.get('/', function(req, res) {
		res.send("hello world")
	});


	// User API


	// create user
	app.post('/api/user', function(req, res) {
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
	});

	// get user by slug
	app.get('/api/user/:slug?', function(req, res) {
		User.findOne({}, function(err, results) {
			console.log(results);
			res.send(results);
		});
	});

	// change password
	app.put('/api/user/', function(req, res) {
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
	});

	// delete user
	app.del('/api/user/:email?', function(req, res) {
		User.remove({"email": req.params.email}, function(err, results) {
			console.log(results);
			res.send(results);
		});
	});
}