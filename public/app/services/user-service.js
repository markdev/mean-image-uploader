console.log("loaded: sunzora services");

'use strict'
// this will probably be useful for authentication:
// http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication
angular
	.module('app')

	.factory('UserFactory', ['$http', '$q', function($http, $q) {

		var urlBase = "/api/users";
		var UserFactory = {};

		UserFactory.login = function(postData) {
			console.log("Submit username and password to login");
			var deferred = $q.defer();

			$http.post(urlBase + "/login", postData)
				.success(function(user){
					if(user.success) { //intermediate if statement is unnecessary after dev is done
						console.log('LOGIN SUCCESSFUL');
						// console.log(user);
						deferred.resolve(user);
					} else {
						console.log('LOGIN FAILURE');
						// console.log(user);
						deferred.resolve(user);
					}
				})
				.error(function(err, user) {
					console.log('LOGIN FAILURE - error');
					// console.log(err);
					deferred.resolve(err);
				});
				return deferred.promise;
		}

		UserFactory.logout = function() {
			console.log("Logging out the user");
			var deferred = $q.defer();
			$http.post("/api/users/logout")
				.success(function(data){
					console.log(data);
				})
		}

		return UserFactory;
	}])
	;