var mongoose = require('mongoose')
  , passport = require('passport')
  , api = require('./route-config')
  ;



module.exports = function(app) {



 	//render jade views as html
	app.get('/views/*', function(req, res) {
		var file = req.params[0];
		res.render('../../public/app/views/' + file);
	});

	//render layout
	app.get('*', function(req, res) {
		//scrub sensitive fields from user object before returning
		var currentUser = {};
		if(req.user) {
			currentUser = {
				_id: req.user._id
				, firstName: req.user.firstName
				, lastName: req.user.lastName
				, username: req.user.username
				, roles: req.user.roles
			}
		}
		// console.log("CURRENT USER");
		// console.log(currentUser);
		res.render('layout', {
			currentUser: currentUser
		});
	});

}