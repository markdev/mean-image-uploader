console.log("loaded: sunzora controllers");

angular
	.module('app')

	.controller('SunzoraCtrl', ['$scope', '$stateParams', '$state', '$location', 'SunzoraFactory', function($scope, $stateParams, $state, $location, SunzoraFactory){
		console.log('SunzoraCtrl loaded...');
		/*
		if (!jQuery.isEmptyObject(SunzoraFactory.getCurrentUser())) {
			console.log("There is a user");
			// nothing happens
		} else {
			console.log("There is no user");
			// redirect to login
         	//window.location( "#/login" );
		}
		*/
	}])