var mongoose 	= require('mongoose')
  , User 		= require('./models/User')
  , Contest 	= require('./models/Contest')
  , Entry 		= require('./models/Entry')
  ;

module.exports = function(config) {
	mongoose.connect(config.db)
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'mongo connection error'));
	db.once('open', function callback() {
		console.log('mongo connection opened');
	});

	//any other initial model calls
	User.createDefaults();
	Contest.createDefaults();
	Entry.createDefaults();
}