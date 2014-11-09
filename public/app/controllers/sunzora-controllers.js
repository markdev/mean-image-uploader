console.log("loaded: sunzora controllers");

angular
	.module('app')

	.controller('SunzoraCtrl', ['$scope', '$stateParams', '$state', '$location', 'SunzoraFactory', function($scope, $stateParams, $state, $location, SunzoraFactory){
		console.log('SunzoraCtrl loaded...');	
	}])

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