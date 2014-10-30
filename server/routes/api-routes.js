var mongoose = require('mongoose')
//  , passport = require('passport')
  , api = require('./route-config')
  ;

//init User model
//var UserSchema = require('../models/User').User
//  , User = mongoose.model('User')

console.log(api.users);

module.exports = function(app) {
	// Routes
	app.get('/', function(req, res) {
		res.send("hello world")
	});

	// User routes
	app.post('/api/user'				, api.users.create);
	app.get('/api/user/list'			, api.users.list);
	app.get('/api/user/:slug?'			, api.users.getBySlug);
	app.put('/api/user/password'		, api.users.changePassword);
	app.del('/api/user/:slug?'			, api.users.deleteUser);
	app.put('/api/user'					, api.users.updateUser);
	app.post('/api/user/avatar'			, api.users.uploadAvatar);
//	app.put('/api/user/addlogin'		, api.users.addLogin);
}