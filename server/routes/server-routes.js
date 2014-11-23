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
		var currentUser = {};
		if(req.user) {
			currentUser = {
				_id: req.user._id
				, firstName: req.user.firstName
				, lastName: req.user.lastName
				, email: req.user.email
				, roles: req.user.roles
			}
		}
		res.render('layout', {
			currentUser: currentUser
		});
	});
}