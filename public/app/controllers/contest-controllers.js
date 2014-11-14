console.log("loaded: contest controllers");

angular
	.module('yote')

	.controller('ContestCreateNewCtrl', ['$scope', '$stateParams', '$state', '$location', 'ContestFactory', function($scope, $stateParams, $state, $location, ContestFactory){
		console.log('ContestCreateNewCtrl loaded...');
		console.log('ContestFactory says: ' + ContestFactory.test());
	}])