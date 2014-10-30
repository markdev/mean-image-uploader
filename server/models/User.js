var mongoose = require('mongoose')
  , crypto = require('crypto')
  ;

//define user schema
var userSchema = mongoose.Schema({
	  created: 			{ type : Date, default: Date.now }
	, updated: 			{ type: Date, default: Date.now }
	, username: 		{ type: String, default: null }
	, first_name: 		{ type: String, default: null }
	, last_name: 		{ type: String, default: null }
	, email: 			{ type: String, index: {unique: true, dropDups: true}}
	, password_salt: 	{ type: String }
	, password_hash: 	{ type: String }
	, roles:  			{ type: [ String ], default: [] }
	, avatar: 			{ type: String }
	, sex: 				{ type: String, enum: ['male', 'female', 'other']}
	, dob: 				{ type: Date, default: Date.now }
	, logins: 			{ type: [ Date ], default: [] }
});

// add password salt/hash stuff
userSchema.statics = {
	createPasswordSalt: function() {
		return crypto.randomBytes(256).toString('base64');
	}
	, hashPassword: function(salt, password) {
		var hmac = crypto.createHmac('sha1', salt);
		return hmac.update(password).digest('hex');
	}
}

var User = mongoose.model('User', userSchema);
