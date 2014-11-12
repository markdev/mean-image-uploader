var mongoose = require('mongoose')
  , passport = require('passport')
  , api = require('./route-config')
  ;

console.log(api.users);

//helper functions
function requireLogin() {
	return function(req, res, next) {
		if(!req.isAuthenticated()) {
			res.status(403);
			res.send("UNAUTHORIZED - NOT LOGGED IN");
		} else {  next(); }
	}
}
function requireRole(role) {
	return function(req, res, next) {
		if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
			res.status(403);
			res.send("UNAUTHORIZED - ADMIN PRIVILEGES REQUIRED");
		} else {  next(); }
	}
}


module.exports = function(app) {
	/****************************
	/*  DEFAULT USER API ROUTES
	/****************************/

	// user login
	app.post('/api/users/login', function(req, res, next) {
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
	});

	// user logout
	app.post('/api/users/logout', function(req, res) {
		req.logout();
		res.end();
	});

	app.get('/logout', function(req, res, next) {
		console.log("LOGGED OUT");
		req.logout();
		res.redirect('/login');
	});


	app.get('/login', function(req, res) {
		res.render('login', {
			isAuthenticated: req.isAuthenticated()
		});
	});

	app.get('/signup', function(req, res) {
		console.log("SIGNUP");
		res.render('signup', {
			isAuthenticated: req.isAuthenticated()
		});
	});
	
	// User routes
	app.post('/api/user'				, api.users.create);
	app.get('/api/user/list'			, api.users.list);
	app.get('/api/user/avatar/:id?'		, api.users.getAvatar);
	app.get('/api/user/:slug?'			, api.users.getBySlug);
	app.put('/api/user/password'		, requireLogin(), api.users.changePassword);
	app.del('/api/user/:slug?'			, api.users.deleteUser);
	app.put('/api/user'					, api.users.updateUser);
	app.post('/api/user/avatar'			, api.users.uploadAvatar);
	app.put('/api/user/resetpassword'	, api.users.requestPasswordReset);

	// Contest routes
	app.post('/api/contest'				, api.contests.create);
	app.put('/api/contest'				, api.contests.edit);
	app.get('/api/contest/byId/:slug' 	, api.contests.getBySlug);
	app.get('/api/contest/byName/:str' 	, api.contests.getByNameStr);
	app.get('/api/contest/byTag/:tag'	, api.contests.getByTag);
	app.get('/api/contest/byCreator/:slug'	, api.contests.getByUser);
	app.get('/api/contest/byCompetitor/:slug'	, api.contests.getByCompetitor);
	app.get('/api/contest/byJudge/:slug'	, api.contests.getByJudge);
	app.del('/api/contest/:slug'		, api.contests.endContest);
	app.post('/api/contest/compete'		, api.contests.compete);
	app.post('/api/contest/judge'		, api.contests.judge);
	app.post('/api/contest/entry'		, api.contests.addEntry);
	app.post('/api/contest/rating' 		, api.contests.addRating);

	// get new entry for this contest
	// rate entry
	// remove entry
	// get entry status
	// get entries by contest
	// report entry // develop later

  // catch all other requests and send 404
	app.all('/api/*', function(req, res) {
		res.send(404);
	});
}