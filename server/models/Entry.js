var mongoose 	= require('mongoose')
  , crypto 		= require('crypto')
  , ObjectId 	= mongoose.SchemaTypes.ObjectId
  ;

//define Entry schema
var entrySchema = mongoose.Schema({
	  _owner: 			{ type: ObjectId, ref: 'User', required: true }
	, contest: 			{ type: ObjectId, ref: 'Contest', required: true }
	, created: 			{ type: Date, default: Date.now }
	, title: 			{ type: String, default: null }
	, contestType:  	{ type: String, enum: ["text", "image"], default: "text" }
	, content: 			{ type: String, default: null }
	, ratings: 			[ {
		  _owner: 		{ type: ObjectId, ref: 'User', required: true }
		, created: 		{ type : Date, default: Date.now }
		, score: 		{ type: Number, required: true }	
		} ]
});


entrySchema.methods = {

};

entrySchema.statics = {

}

Entry = mongoose.model('Entry', entrySchema);

//Entry model methods
exports.createDefaults = function() {
	console.log("entry create defaults");

};
