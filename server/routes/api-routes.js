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
	
	// User routes
	app.post('/api/user/login'			, api.users.login);
	app.post('/api/user/logout'			, api.users.logout); 
	app.post('/api/user'				, api.users.create);
	//app.get('/api/user/list'			, api.users.list); // security hazard
	app.get('/api/user/avatar/:id?'		, api.users.getAvatar);
	app.get('/api/user/:slug?'			, api.users.getBySlug);
	app.put('/api/user/password'		, requireLogin(), api.users.changePassword);
	app.del('/api/user/:slug?'			, api.users.deleteUser);
	app.put('/api/user'					, api.users.updateUser);
	app.post('/api/user/avatar'			, api.users.uploadAvatar);
	app.put('/api/user/resetpassword'	, api.users.requestPasswordReset);

	// Contest routes
	app.post('/api/contest'				, requireLogin(),	 api.contests.create); // about to test require login
	app.put('/api/contest'				, api.contests.edit);
	app.del('/api/contest/:id'			, api.contests.deleteContest);
	app.get('/api/contest/byOwner/:id'	, api.contests.getByOwner);
	app.get('/api/contest/byId/:slug' 	, api.contests.getBySlug);
	app.get('/api/contest/byName/:str' 	, api.contests.getByNameStr);
	app.get('/api/contest/byTag/:tag'	, api.contests.getByTag);
	app.get('/api/contest/byString/:str' 	, requireLogin(), api.contests.getByTagOrName);
	app.get('/api/contest/byCreator/:slug'	, api.contests.getByUser);
	app.get('/api/contest/byCompetitor/:slug'	, api.contests.getByCompetitor);
	app.get('/api/contest/byJudge/:slug'	, api.contests.getByJudge);
	app.del('/api/contest/:slug'		, api.contests.endContest);
	app.post('/api/contest/compete'		, api.contests.compete);
	app.post('/api/contest/judge'		, api.contests.judge);
	app.post('/api/contest/entry'		, api.contests.addEntry);
	app.post('/api/contest/rating' 		, api.contests.addRating);
	app.get('/api/contest/banner/:id?' 	, api.contests.getBanner);
	app.post('/api/contest/banner' 		, api.contests.uploadBanner);
	app.get('/api/contest/judgeState/:contest/:user', api.contests.getJudgeState);
	app.get('/api/contest/competeState/:contest/:user', api.contests.getCompeteState);

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