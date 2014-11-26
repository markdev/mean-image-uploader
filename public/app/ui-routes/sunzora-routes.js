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
				, controller: 'UserLoginCtrl'
			})

			.state('logout', {
				  url: '/logout'
				//templateUrl: '/views/login'
				, controller: 'UserLogoutCtrl'
			})

			.state('signup', {
				  url: '/signup'
				, templateUrl: '/views/signupview'
				, controller: 'UserLogoutCtrl'
			})

			//////////////
			.state('search', {
				  abstract: true
				, url: '/search'
				, templateUrl: '/views/default'
				, controller: function($scope) {
					$scope.title = 'search';
				}
			})

			.state('search.home', {
				  url: ''
				, templateUrl: '/views/search/main'
			})


			//////////////
			.state('create', {
				  abstract: true
				, url: '/create'
				, templateUrl: '/views/default'
				, controller: function($scope) {
					$scope.title = 'create';
				}
			})

			.state('create.home', {
				  url: ''
				, templateUrl: '/views/create/list'
			})

			.state('create.new', {
				  url: '/new'
				, templateUrl: '/views/create/new'
			})

			.state('create.edit', {
				  url: '/edit/:id'
				, templateUrl: '/views/create/edit'
			})


			//////////////
			.state('contest', {
				  abstract: true
				, url: '/contest'
				, templateUrl: '/views/default'
				, controller: function($scope) {
					$scope.title = 'contest';
				}
			})

			.state('contest.join', {
				  url: '/join/:id'
				, templateUrl: '/views/contest/join'
				, controller: 'ContestJoinCtrl'
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
				  url: ''
				, templateUrl: '/views/messages/main'
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
				  url: ''
				, templateUrl: '/views/judge/main'
			})

			.state('judge.contest', {
				  url: '/:id'
				, templateUrl: '/views/judge/contest'
				, controller: 'ContestJudgeCtrl'
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
				  url: ''
				, templateUrl: '/views/compete/main'
				, controller: 'ContestCompeteListCtrl'
			})

			.state('compete.submit', {
				  url: '/submit/:id'
				, templateUrl: '/views/compete/submit'
			})

			.state('compete.status', {
				  url: '/status/:id'
				, templateUrl: '/views/compete/playByPlay'
				, controller: 'EntryPlayByPlayCtrl'
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

			.state('settings.avatar', {
				url: '/account',
				templateUrl: '/views/settings/avatar'
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