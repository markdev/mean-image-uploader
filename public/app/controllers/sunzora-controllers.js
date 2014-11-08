console.log("loaded: sunzora controllers");

angular
	.module('app')

	.controller('SunzoraCtrl', ['$scope', '$stateParams', '$state', 'SunzoraFactory', function($scope, $stateParams, $state, SunzoraFactory){
		console.log('SunzoraCtrl loaded...');
	}])