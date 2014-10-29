var mongoose = require('mongoose')
  , crypto = require('crypto')
  ;

//define user schema
var userSchema = mongoose.Schema({
	  email: 		{ type: String }
	, password: 	{ type: String }
	, avatar: 		{ type: String }
	, sex: 			{ type: String, enum: ['male', 'female', 'other']}
	, dob: 			{ type: Date }
	, createdOn: 	{ type : Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);
