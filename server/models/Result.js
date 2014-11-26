var mongoose 	= require('mongoose')
  , ObjectId 	= mongoose.SchemaTypes.ObjectId
  ;

//define Result schema
var resultSchema = mongoose.Schema({
	  _owner: 			{ type: ObjectId, ref: 'User', required: true }
	, contest: 			{ type: ObjectId, ref: 'Contest', required: true }
	, entry: 			{ type: ObjectId, ref: 'Entry', required: true }
	, title: 			{ type: String, default: null }
	, deadline: 		{ type: Date }
	, score: 			{ type: Number }
	, rank: 			{ type: Number }
	, totalEntries: 	{ type: Number }
	, totalVotes: 		{ type: Number }
});

Result = mongoose.model('Result', resultSchema);

//Result model methods
exports.createDefaults = function() {
	console.log("entry create defaults");

};
