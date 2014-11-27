console.log("loaded: result services");

'use strict'

angular
	.module('yote')

	.factory('ResultFactory', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {

		var urlBase = "/api/result";
		var ResultFactory = {};

		ResultFactory.getResultsByUser = function() {
			console.log("Getting results by user");
			var deferred = $q.defer();
			$http.get(urlBase + "/byUser/" + $rootScope.currentUser._id)
				.success(function(entries) {
					console.log("SUCCESS!")
					deferred.resolve(entries)
				})
			return deferred.promise;
		}

		return ResultFactory;
	}])
	;