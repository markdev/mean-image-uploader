console.log("loaded: sunzora services");

'use strict'

angular
	.module('app')

	.factory('SunzoraFactory', ['$http', '$q', function($http, $q) {

		var SunzoraFactory = {};

		// insert SunzoraFactory methods here

		return SunzoraFactory;
	}])
	;