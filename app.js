// Declare variables
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var crypto = require('crypto');
app.use(bodyParser());

// Mongoose connection
mongoose.connect('mongodb://127.0.0.1/sunzora');

// Mongoose models
var User = mongoose.model('User', {
	  email: String
	, password: String
//	, avatar: String
//	, sex: {
//		type: String,
//		enum: ['male', 'female', 'other']
//	}
//	, dob: Date
//	, createdOn: Date
});


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
			process.exit(1);
			res.send("error");
		} else {
			console.log('Saved: ', results);
			process.exit(0);
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
				process.exit(1);
				res.send("error");
			} else {
				console.log('Saved: ', results);
				process.exit(0);
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


app.listen(3000);
console.log("app is listening on port 3000");