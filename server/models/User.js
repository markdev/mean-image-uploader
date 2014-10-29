var mongoose = require('mongoose')
  , crypto = require('crypto')
  ;

//define user schema
var userSchema = mongoose.Schema({
	  created: 		{ type : Date, default: Date.now }
	, updated: 		{ type: Date, default: Date.now }
	, name: {
		  username: { type: String, default: null }
	  	, first: 	{ type: String, default: null }
	  	, last: 	{ type: String, default: null }
	  }
	, email: 		{ type: String }
	, passwordSalt: { type: String }
	, passwordHash: { type: String }
	, avatar: 		{ type: String }
	, sex: 			{ type: String, enum: ['male', 'female', 'other']}
	, dob: 			{ type: Date, default: Date.now }
	, logins: 		{ type: [ Date ], default: [] }
});
// add password salt/hash stuff
// add roles

var User = mongoose.model('User', userSchema);
