console.log("loaded: contest controllers");

angular
	.module('yote')

	.controller('ContestCreateNewCtrl', ['$scope', '$stateParams', '$state', '$location', 'ContestFactory', function($scope, $stateParams, $state, $location, ContestFactory){
		console.log('ContestCreateNewCtrl loaded...');
		$scope.title = "Cat Pics";
		$scope.tags = "Felines, Cats, Kitties";
		$scope.rules = "Must be a cute kitty";
		$scope.deadline = new Date();
		$scope.create = function() {
			var postData = {};
			postData.title = $scope.title;
			postData.deadline = $scope.deadline;
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

	.controller('ContestListCtrl', ['$scope', '$stateParams', '$state', '$location', 'ContestFactory', function($scope, $stateParams, $state, $location, ContestFactory){
		console.log('ContestListCtrl loaded...');
		$scope.contests = [];
		var getContests = function() {
			ContestFactory.getContestsByOwner()
				.then(function(contests) {
					//console.log(data);
					if (contests.success) {
						console.log(contests);
						$scope.contests = contests.contests;
					} else {
						console.log("fail");
					}		
				})
			};
		getContests();
		$scope.deleteContest = function(_id) {
			var del = confirm("Are you sure you want to delete this contest?")
			if (del == true) {
				ContestFactory.deleteContest(_id)
					.then(function(contests) {
						getContests();
					})				
			}
		}
	}])

	.controller('ContestEditCtrl', ['$scope', '$timeout', '$upload', '$stateParams', '$state', '$location', 'ContestFactory', function($scope, $timeout, $upload, $stateParams, $state, $location, ContestFactory){
		console.log('ContestEditCtrl loaded...');
		$scope.id = $stateParams.id;
		var path = 'http://127.0.0.1:3000'; // TODO change this obv
		ContestFactory.getContestById($scope.id)
			.then(function(response) {
				console.log(response);
				$scope.contest = response.contest;
				$scope.contest.tags = response.contest.tags.join(", ");
				$timeout(function () {
					$scope.path = path + '/api/contest/banner/' + $scope.contest._id;
				}, 1000);
			})
		$scope.onFileSelect = function($files) {
			for (var i = 0; i < $files.length; i++) {
				var file = $files[i];
				console.log(file);
				$scope.upload = $upload.upload({
					method: 'POST',
					url: '/api/contest/banner',
					data: { id: $scope.contest._id },
					file: file
				}).progress(function(evt) {
					console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
				}).success(function(data, status, headers, config) {
        			console.log(data);
      			});
			}
		};
		$scope.update = function() {
			var postData = {};
			postData._id = $scope.id;
			postData.title = $scope.contest.title;
			postData.tags = [];
			$.each($scope.contest.tags.split(','), function() {
    			postData.tags.push($.trim(this).toLowerCase());
			});
			ContestFactory.edit(postData)
				.then(function(response) {
					console.log(response);
				})
		}
	}])
