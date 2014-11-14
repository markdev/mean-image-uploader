console.log("loaded: contest services");

'use strict'

angular
	.module('yote')

	.factory('ContestFactory', ['$http', '$q', function($http, $q) {
		
		var urlBase = "/api/contest";
		var ContestFactory = {};

		ContestFactory.test = function() {
			return "ContestFactory test";
		}

		return ContestFactory;
	}])
	;
