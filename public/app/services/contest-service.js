console.log("loaded: contest services");

'use strict'

angular
	.module('yote')

	.factory('ContestFactory', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
		
		var urlBase = "/api/contest";
		var ContestFactory = {};

		ContestFactory.create = function(postData) {
			console.log("Creating a new contest");
			var deferred = $q.defer(postData);
			$http.post(urlBase, postData)
				.success(function(contest) {
					console.log("SUCCESS!")
					deferred.resolve(contest)
				})
			return deferred.promise;
		}

		ContestFactory.getContestsByOwner = function() {
			console.log("Getting contests by owner");
			var deferred = $q.defer();
			$http.get(urlBase + "/byOwner/" + $rootScope.currentUser._id)
				.success(function(contest) {
					console.log("SUCCESS!")
					deferred.resolve(contest)
				})
			return deferred.promise;			
		}

		return ContestFactory;
	}])
	;
