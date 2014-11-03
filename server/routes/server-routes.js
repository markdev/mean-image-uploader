var mongoose = require('mongoose')
  , passport = require('passport')
  , api = require('./route-config')
  ;

module.exports = function(app) {

 	//render jade views as html
	app.get('/views/*', function(req, res) {
		console.log(req.params);
		//res.render('../../public/app/views/' + req.params['0']);
		res.render(req.params['0']);
	});

}