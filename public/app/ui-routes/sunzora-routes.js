console.log("loaded: sunzora routes");

angular
	.module('app')

	.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
		console.log('loaded default router');
		
		//seems to get rid of the "#" in the url
		//$locationProvider.html5Mode(true);

		// add a route to 404 page here
		$urlRouterProvider.otherwise('/');

		$stateProvider

			.state('root', {
				//abstract: true,
				url: '/',
				templateUrl: '/views/default'
			})

			.state('root.home', {
				url: '/addon',
				templateUrl: '/views/addon'
				//controller: 'SunzoraCtrl'
			})

			.state('login', {
				url: '/login',
				templateUrl: '/views/login'
				//controller: 'SunzoraCtrl'
			})


	// end state config
	})

	// end file
	;