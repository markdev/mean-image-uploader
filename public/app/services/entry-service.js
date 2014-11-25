console.log("loaded: entry services");

'use strict'

angular
	.module('yote')

	.factory('EntryFactory', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {

		var urlBase = "/api/entry";
		var EntryFactory = {};

		EntryFactory.getContestsByCompetitor = function() {
			console.log("Getting contests by competitor");
			var deferred = $q.defer();
			$http.get(urlBase + "/byUser/" + $rootScope.currentUser._id)
				.success(function(entries) {
					console.log("SUCCESS!")
					deferred.resolve(entries)
				})
			return deferred.promise;
		}

		EntryFactory.getEntriesByContest = function(contestId) {
			console.log("Getting entries by contest");
			var deferred = $q.defer();
			$http.get(urlBase + "/byContest/" + contestId)
				.success(function(response) {
					console.log("SUCCESS!")
					deferred.resolve(response)
				})
			return deferred.promise;
		}

		EntryFactory.loadNewEntry = function(postData) {
			console.log("Loading Entry");
			var deferred = $q.defer(postData);
			$http.post(urlBase + "/loadNew", postData)
				.success(function(response) {
					console.log("SUCCESS");
					deferred.resolve(response)
				})
			return deferred.promise;
		}

		EntryFactory.addRating = function(postData) {
			console.log("Adding Rating");
			var deferred = $q.defer(postData);
			$http.post(urlBase + "/rating", postData)
				.success(function(response) {
					console.log("SUCCESS");
					deferred.resolve(response)
				})
			return deferred.promise;
		}

		return EntryFactory;
	}])
	;