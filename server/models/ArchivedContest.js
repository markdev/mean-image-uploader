var mongoose 	= require('mongoose')
  , crypto 		= require('crypto')
  , ObjectId 	= mongoose.SchemaTypes.ObjectId
  ;

//define Contest schema
var archivedContestSchema = mongoose.Schema({
	  _owner: 					{ type: ObjectId, ref: 'userSchema', required: true }
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


ArchivedContest = mongoose.model('ArchivedContest', archivedContestSchema)

//Contest model methods
exports.createDefaults = function() {
	console.log("archived contest create defaults");

};