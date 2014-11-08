console.log("loaded: sunzora services");

'use strict'
// this will probably be useful for authentication:
// http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication
angular
	.module('app')

	.factory('SunzoraFactory', ['$http', '$q', function($http, $q) {

		var SunzoraFactory = {};

		SunzoraFactory.test = function() {
			return "this came from the sunzora factory";
		}

		SunzoraFactory.getCurrentUser = function() {
			var currentUser = window.currentUser;
			return currentUser;
		}

		return SunzoraFactory;
	}])
	;