var mongoose = require('mongoose')
  , crypto = require('crypto')
  ;

//define user schema
var User = mongoose.model('User', {
	  email: String
	, password: String
	, avatar: String
	, sex: {
		type: String,
		enum: ['male', 'female', 'other']
	}
	, dob: Date
	, createdOn: { 
		type : Date, 
		default: Date.now 
	}
});
