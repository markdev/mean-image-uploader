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
				  abstract: true
				, url: '/'
				, templateUrl: '/views/default'
				, controller: function($scope){
					$scope.title = 'home';
				}
			})

			.state('root.home', {
				  url: ''
				, parent: 'root' // any problems here?
				, templateUrl: '/views/home/main'
				, controller: 'SunzoraHomepageCtrl'
			})

			.state('login', {
				  url: '/login'
				, templateUrl: '/views/login'
				//controller: 'UserLoginCtrl'
			})

			.state('logout', {
				url: '/logout',
				//templateUrl: '/views/login'
				controller: 'UserLogoutCtrl'
			})

			.state('signup', {
				url: '/signup',
				templateUrl: '/views/signupview',
				controller: 'UserLogoutCtrl'
			})

			//////////////
			.state('create', {
				  abstract: true
				, url: '/create'
				, templateUrl: '/views/default'
				//, controller: 'SunzoraCtrl'
				, controller: function($scope) {
					$scope.title = 'create';
				}
			})

			.state('create.home', {
				url: '',
				templateUrl: '/views/create'
			})

			//////////////
			.state('messages', {
				  abstract: true
				, url: '/messages'
				, templateUrl: '/views/default'
				, controller: function($scope) {
					$scope.title = 'messages';
				}
			})

			.state('messages.home', {
				url: '',
				templateUrl: '/views/messages'
			})

			//////////////
			.state('judge', {
				  abstract: true
				, url: '/judge'
				, templateUrl: '/views/default'
				, controller: function($scope) {
					$scope.title = 'judge';
				}
			})

			.state('judge.home', {
				url: '',
				templateUrl: '/views/judge'
			})

			//////////////
			.state('compete', {
				  abstract: true
				, url: '/compete'
				, templateUrl: '/views/default'
				, controller: function($scope) {
					$scope.title = 'compete';
				}
			})

			.state('compete.home', {
				url: '',
				templateUrl: '/views/compete'
			})

			//////////////
			.state('settings', {
				  abstract: true
				, url: '/settings'
				, templateUrl: '/views/default'
				, controller: function($scope) {
					$scope.title = 'settings';
				}
			})

			.state('settings.home', {
				url: '',
				templateUrl: '/views/settings/main'
			})

			.state('settings.updateAccount', {
				url: '/account',
				templateUrl: '/views/settings/account'
			})

			.state('settings.changePassword', {
				url: '/password',
				templateUrl: '/views/settings/changePassword'
			})

			.state('settings.viewAwards', {
				url: '/awards',
				templateUrl: '/views/settings/awards'
			})

			.state('settings.terms', {
				url: '/terms',
				templateUrl: '/views/settings/terms'
			})

			.state('settings.contact', {
				url: '/contact',
				templateUrl: '/views/settings/contact'
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