console.log("loaded: sunzora routes");

angular
	.module('yote')

	.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
		console.log('loaded default router');
		
		//seems to get rid of the "#" in the url
		$locationProvider.html5Mode(true);

		// add a route to 404 page here
		$urlRouterProvider.otherwise('/');

		$stateProvider

			.state('root', {
				//abstract: true,
				  url: '/'
				, templateUrl: '/views/default'
				/*
				onEnter: function() {
					console.log("I WORK DAMMIT");
					$state.go('loginPage');
				}
				*/
			})

			.state('root.home', {
				url: '/addon',
				templateUrl: '/views/addon',
				controller: 'SunzoraCtrl',
			})

			.state('login', {
				url: '/login',
				templateUrl: '/views/login'
				//controller: 'SunzoraCtrl'
			})

			.state('logout', {
				url: '/logout',
				//templateUrl: '/views/login'
				controller: 'UserLogoutCtrl'
			})

			//////////////
			.state('create', {
				abstract: true,
				url: '/create',
				templateUrl: '/views/default',
				controller: 'SunzoraCtrl'
			})

			.state('create.home', {
				url: '',
				templateUrl: '/views/create'
			})

			//////////////
			.state('messages', {
				abstract: true,
				url: '/messages',
				templateUrl: '/views/default'
				//controller: 'SunzoraCtrl'
			})

			.state('messages.home', {
				url: '',
				templateUrl: '/views/messages'
			})

			//////////////
			.state('judge', {
				abstract: true,
				url: '/judge',
				templateUrl: '/views/default'
				//controller: 'SunzoraCtrl'
			})

			.state('judge.home', {
				url: '',
				templateUrl: '/views/judge'
			})

			//////////////
			.state('compete', {
				abstract: true,
				url: '/compete',
				templateUrl: '/views/default'
				//controller: 'SunzoraCtrl'
			})

			.state('compete.home', {
				url: '',
				templateUrl: '/views/compete'
			})

			//////////////
			.state('settings', {
				abstract: true,
				url: '/settings',
				templateUrl: '/views/default'
				//controller: 'SunzoraCtrl'
			})

			.state('settings.home', {
				url: '',
				templateUrl: '/views/settings'
			})

			//////////////
			.state('loginPage', {
				url: '/login',
				templateUrl: '/views/login'
			})


	// end state config
	})

	// end file
	;