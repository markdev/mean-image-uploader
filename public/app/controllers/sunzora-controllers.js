console.log("loaded: sunzora controllers");

angular
	.module('yote')

	.controller('SunzoraCtrl', ['$scope', '$stateParams', '$state', '$location', 'SunzoraFactory', function($scope, $stateParams, $state, $location, SunzoraFactory){
		console.log('SunzoraCtrl loaded...');
	}])

	.controller('SunzoraHomepageCtrl', ['$scope', '$stateParams', '$rootScope', '$state', '$location', 'SunzoraFactory', function($scope, $stateParams, $rootScope, $state, $location, SunzoraFactory){
		console.log('SunzoraHomepageCtrl loaded...');
		if (jQuery.isEmptyObject($rootScope.currentUser)) {
			$state.go('login');
		}
	}])

	.controller('SunzoraTestCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$location', 'SunzoraFactory', function($scope, $rootScope, $stateParams, $state, $location, SunzoraFactory){
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
			$scope.menuName = $state.current.name.split(".")[0];
			console.log($scope.menuName);
			//console.log($state.current.name);
		})
	}])
