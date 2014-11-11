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
					$state.go('login')
				})

		}
	}])

	.controller('UserSignupCtrl', ['$scope', '$stateParams', '$state', '$location', 'SunzoraFactory', 'UserFactory', function($scope, $stateParams, $state, $location, SunzoraFactory, UserFactory){
		$scope.email = 'mark.karavan@gmail.com';
		$scope.password = 'mark';
		$scope.password2 = 'mark';
		$scope.signup = function() {
			var postData = {};
			postData.email = $scope.email;
			postData.password = $scope.password;
			postData.password2 = $scope.password2;
			console.log(postData);
			UserFactory.signup(postData)
				.then(function(data) {
					console.log(data)
				})

		}
	}])

	.controller('UserLoginCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'SunzoraFactory', 'UserFactory', function($scope, $stateParams, $state, $rootScope, SunzoraFactory, UserFactory) {
		$scope.email = "mark.karavan@gmail.com";
		$scope.password = "mark";
		$scope.loginAction = function() {
			var postData = {};
			postData.email = $scope.email;
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
	/*
		$scope.logout = function() {
			UserFactory.logout();
		};
	*/
	}])