console.log("loaded: contest controllers");

angular
	.module('yote')

	.controller('ContestCreateNewCtrl', ['$scope', '$stateParams', '$state', '$location', 'ContestFactory', function($scope, $stateParams, $state, $location, ContestFactory){
		console.log('ContestCreateNewCtrl loaded...');
		$scope.title = "Cat Pics";
		$scope.tags = "Felines, Cats, Kitties";
		$scope.rules = "Must be a cute kitty";
		$scope.deadline = "12/1/2014";
		$scope.create = function() {
			var postData = {};
			postData.title = $scope.title;
			postData.tags = [];
			$.each($scope.tags.split(','), function() {
    			postData.tags.push($.trim(this).toLowerCase());
			});
			postData.rules = $scope.rules;
			ContestFactory.create(postData)
				.then(function(data) {
					//console.log(data);
					if (data.success) {
						$state.go('create.home');
					} else {
						console.log("fail");
					}					
				})
		};
	}])