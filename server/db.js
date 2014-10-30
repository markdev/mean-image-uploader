var mongoose = require('mongoose')
  , User = require('./models/User')
  ;

module.exports = function(config) {
	mongoose.connect(config.db)

	//any other initial model calls
	User.createDefaults();
}