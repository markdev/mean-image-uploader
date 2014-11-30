var mongoose 	= require('mongoose')
  , crypto 		= require('crypto')
  , ObjectId 	= mongoose.SchemaTypes.ObjectId
  , CronJob 	= require('cron').CronJob
  ;

//define Contest schema
var contestSchema = mongoose.Schema({
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


contestSchema.methods = {

};

contestSchema.statics = {

};

Contest = mongoose.model('Contest', contestSchema);

//Contest model methods
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

//archive cronjob
var checkForDeadlines = function() {
	console.log("deadline cron")
	Contest.find({}, function(err, contests) {
		for (var i=0; i<=contests.length; i++) {
			if (typeof contests[i] !== "undefined") {
				var deadline = Date.parse(contests[i].deadline);
				var currentTime = new Date().getTime();
				if (currentTime >= deadline) {
					archiveContest(contests[i]._id);
				}
			}
		}
	})
}

var archiveContest = function(cId) {
	Contest.findOne(
		{
			"_id": cId
		},
		function(err, contest) {
			ArchivedContest.create(contest, function(err, aContest) {
				contest.remove(function(err) {
					//console.log("THIS HAS BEEN REMOVED");
					moveEntriesToAwards(contest)
				});
			})
		}
	)
}

var moveEntriesToAwards = function(contest) {
	Entry.find(
		{
			"contest": contest._id
		},
		function(err, entries) {
			var resultsArray = [];
			for (var i=0; i<=entries.length; i++) {
				if (entries[i] != null && entries[i] != undefined) {
					var resultObject = {};
					resultObject._owner = entries[i]._owner;
					resultObject.entry = entries[i]._id;
					resultObject.title = entries[i].title;
					resultObject.contest = entries[i].contest;
					resultObject.deadline = contest.deadline;
					var ratingSum = 0;
					for (var j=0; j<entries[i].ratings.length; j++) {
						if (entries[i].ratings[j] != null) ratingSum += entries[i].ratings[j].score;
					}
					resultObject.score = ratingSum / entries[i].ratings.length;
					resultObject.rank = null;
					resultObject.totalEntries = entries.length;
					resultObject.totalVotes = entries[i].ratings.length;
					resultsArray.push(resultObject);
				}
			}
			function compare(a,b) {
				if (a.score < b.score)
					return -1;
				if (a.score > b.score)
					return 1;
				return 0;
			}
			resultsArray.sort(compare).reverse();
			for (var i=1; i<=resultsArray.length; i++) {
				if (typeof resultsArray[i] !== "undefined")
					resultsArray[i].rank = i;
				Result.create(resultsArray[i], function(err, result) {
					console.log("done");
				});
			}
		}
	)
}

new CronJob('00 * * * * *', function(){
    checkForDeadlines();
}, null, true, "America/New_York");

/*
Seconds: 0-59
Minutes: 0-59
Hours: 0-23
Day of Month: 1-31
Months: 0-11
Day of Week: 0-6

var CronJob = require('cron').CronJob;
var job = new CronJob('00 30 11 * * 1-5', function(){
    // Runs every weekday (Monday through Friday)
    // at 11:30:00 AM. It does not run on Saturday
    // or Sunday.
  }, function () {
    // This function is executed when the job stops
  },
  true  //Start the job right now ,
  timeZone  //Time zone of this job. 
);
*/