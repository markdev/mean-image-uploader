var mongoose = require('mongoose')
  , ObjectId = mongoose.SchemaTypes.ObjectId
  , Schema = mongoose.Schema
//  , crypto = require('crypto')
  ;


var entrySchema = mongoose.Schema({
	  _owner: 			{ type: Schema.ObjectId, ref: 'userSchema' }
	, created: 			{ type: Date, default: Date.now }
	, title: 			{ type: String, default: null }
	, content: 			{ type: String, default: null }
	, ratings: 			[ {
		  _owner: 		{ type: Schema.ObjectId, ref: 'User' }
		, created: 		{ type : Date, default: Date.now }
		, score: 		{ type: Number }	
		} ]
});

var contestSchema = mongoose.Schema({
	  _owner: 					{ type: Schema.ObjectId, ref: 'userSchema', required: true }
	, created: 					{ type: Date, default: Date.now }
	, title: 					{ type: String, required: true }
	, banner:  					{ type: String, default: null }
	, rules: 					{ type: String }
	, tags: 					{ type: [ String ] }
	, deadline: 				{ type: Date }
	, submissionAvailability: 	{ type: String, enum: ["owner", "public"], default: "owner" }
	, submissionLimit: 			{ type: String, enum: ["one", "many"], default: "many" }
	, judging: 					{ type: String, enum: ["public"], default: "public" }
	, competitors: 				[ { type: ObjectId, ref: "User"} ]
	, judges: 					[ { type: ObjectId, ref: "User"} ]
	, entries: 					[ { type: ObjectId, ref: "Entry"} ]
});


contestSchema.methods = {

};

contestSchema.statics = {
	/*
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
	*/
}

var Contest = mongoose.model('Contest', contestSchema);
var Entry = mongoose.model('Entry', entrySchema);

//user model methods
exports.createDefaults = function() {
	console.log("contest create defaults");
	Contest.find({}).exec(function(err, contests) {
		if(contests.length === 0) {
			Contest.create({
				title: "Hot Guys",
				rules: "Must be a hot guy, must be you",
				tags: ['male', 'dudes', 'studs'],
				competition: "public",
				judging: "public"
			});
			console.log("created initial default contest 'Hot Guys'");
		}
	});
};