console.log("loaded: sunzora services");

'use strict'
// this will probably be useful for authentication:
// http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication
angular
	.module('app')

	.factory('SunzoraFactory', ['$http', '$q', function($http, $q) {

		var urlBase = "/api/users/login"
		var SunzoraFactory = {};

		SunzoraFactory.test = function() {
			return "this came from the sunzora factory";
		}

		SunzoraFactory.getCurrentUser = function() {
			var currentUser = window.currentUser;
			return currentUser;
		}

		SunzoraFactory.submit = function(postData) {
			console.log("Submit username and password to login");
			var deferred = $q.defer();
			$http.post(urlBase, postData)
				.success(function(data){
					console.log(data);
				})
			//console.log(username);
			//console.log(password);
		}

		SunzoraFactory.logout = function() {
			console.log("Logging out the user");
			var deferred = $q.defer();
			$http.post("/api/users/logout")
				.success(function(data){
					console.log(data);
				})
		}

		return SunzoraFactory;
	}])
	;