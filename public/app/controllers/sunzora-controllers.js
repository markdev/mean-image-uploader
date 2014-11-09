console.log("loaded: sunzora controllers");

angular
	.module('app')

	.controller('SunzoraCtrl', ['$scope', '$stateParams', '$state', '$location', 'SunzoraFactory', function($scope, $stateParams, $state, $location, SunzoraFactory){
		console.log('SunzoraCtrl loaded...');	
	}])

	.controller('LoginCtrl', ['$scope', 'SunzoraFactory', function($scope, SunzoraFactory) {
		$scope.username = "admin";
		$scope.password = "admin";
		$scope.submit = function() {
			var postData = {};
			postData.username = $scope.username;
			postData.password = $scope.password;
			SunzoraFactory.submit(postData);
		}
		$scope.logout = function() {
			SunzoraFactory.logout();
		}
	}])