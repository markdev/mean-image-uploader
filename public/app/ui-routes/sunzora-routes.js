console.log("loaded: sunzora routes");

angular
	.module('app')

	.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
		console.log('loaded default router');
		
		$locationProvider.html5Mode(true);

		// add a route to 404 page here
		$urlRouterProvider.otherwise('/');

		$stateProvider

			.state('root', {
				abstract: true,
				url: '/',
				templateUrl: '/views/default'
			})

			.state('root.home', {
				url: '',
				templateUrl: '/views/addon',
				controller: 'SunzoraCtrl'
			})


	// end state config
	})

	// end file
	;