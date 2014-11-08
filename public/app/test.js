// declare a module
angular
	.module('app', [
		'ui.router'
	])
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'templates/home.html'
			})
			.state('about', {
				url: '/about',
				templateUrl: 'templates/about.html'
			})
			.state('contact', {
				url: '/contact',
				templateUrl: 'templates/contact.html'
			})
	}])




/*
	.controller('MainController', function($scope) {
		$scope.val = 1;
		$scope.even = false;
		$scope.foo.val = "this is it";

		$scope.inc = function() {
			$scope.val += 1;
			$scope.even = ($scope.val % 2 == 0)? true : false;
		}
	})

	.config(function($routeProvider) {
		$routeProvider
			.when('/', {templateUrl: 'view.html', controller: 'MainController'});
	})
*/