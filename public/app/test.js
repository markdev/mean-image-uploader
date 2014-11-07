// declare a module
angular.module('webapp', [])


.controller('MainController', function($scope) {
	$scope.val = 1;
	$scope.even = false;

	$scope.inc = function() {
		$scope.val += 1;
		$scope.even = ($scope.val % 2 == 0)? true : false;
	}
})