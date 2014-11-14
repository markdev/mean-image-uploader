console.log("loaded: contest services");

'use strict'

angular
	.module('yote')

	.factory('ContestFactory', ['$http', '$q', function($http, $q) {
		
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

		return ContestFactory;
	}])
	;
