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
	, avatar: 			{ type: String, default: null }
	, sex: 				{ type: String, enum: ['male', 'female', 'other']}
	, dob: 				{ type: Date, default: Date.now }
	, logins: 			{ type: [ Date ], default: [] }
});


userSchema.methods = {
	authenticate: function(passwordToMatch) {
		console.log("trying to authenticate username '" + this.username + "'");
		return User.hashPassword(this.password_salt, passwordToMatch) === this.password_hash;
	}
};

userSchema.statics = {
	createPasswordSalt: function() {
		return crypto.randomBytes(256).toString('base64');
	}
	, hashPassword: function(salt, password) {
		var hmac = crypto.createHmac('sha1', salt);
		return hmac.update(password).digest('hex');
	}
	, createRandomString: function() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for( var i=0; i < 6; i++ ) {
        	text += possible.charAt(Math.floor(Math.random() * possible.length)); }
        return text;
	}
}

var User = mongoose.model('User', userSchema);

//user model methods
exports.createDefaults = function() {
	User.find({}).exec(function(err, users) {
		if(users.length === 0) {
			var password_salt, password_hash;
			password_salt = User.createPasswordSalt();
			password_hash = User.hashPassword(password_salt, 'admin');
			User.create({firstName:'Admin', lastName:'Admin', username:'admin', password_salt: password_salt, password_hash: password_hash, roles: ['admin']});
			console.log("created initial default user w/ username 'admin' and password 'admin'");
		}
	});
};