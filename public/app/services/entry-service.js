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

		return EntryFactory;
	}])
	;