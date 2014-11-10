console.log("loaded: sunzora controllers");

angular
	.module('yote')

	.controller('SunzoraCtrl', ['$scope', '$stateParams', '$state', '$location', 'SunzoraFactory', function($scope, $stateParams, $state, $location, SunzoraFactory){
		console.log('SunzoraCtrl loaded...');
	}])

	.controller('UserLogoutCtrl', ['$scope', '$stateParams', '$state', '$location', 'SunzoraFactory', 'UserFactory', function($scope, $stateParams, $state, $location, SunzoraFactory, UserFactory){
		$scope.logout = function() {
			console.log("logging out");
			UserFactory.logout()
				.then(function(data) {
					console.log(data);
					console.log("now redirect");
				})

		}
	}])
/*
	.controller('UserLoginCtrl', ['$scope', '$stateParams', '$state', '$location', 'SunzoraFactory', function($scope, $stateParams, $state, $location, SunzoraFactory){
		$scope.loginAction = function() {
			console.log("Logging in");
		};
	}])
*/

	.controller('UserLoginCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'SunzoraFactory', 'UserFactory', function($scope, $stateParams, $state, $rootScope, SunzoraFactory, UserFactory) {
		$scope.username = "admin";
		$scope.password = "admin";
		$scope.loginAction = function() {
			var postData = {};
			postData.username = $scope.username;
			postData.password = $scope.password;
			UserFactory.login(postData)
				.then(function(data) {
					console.log(data);
					if (data.success) {
						$rootScope.currentUser = data.user;
						$state.go('root')
					}
				})
		};
		$scope.logout = function() {
			UserFactory.logout();
		};
	}])