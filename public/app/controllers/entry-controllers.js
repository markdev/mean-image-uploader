console.log("loaded: entry controllers");

angular
	.module('yote')

	.controller('EntrySubmitCtrl', ['$scope', 'fileReader', '$upload', '$stateParams', '$state', 'ContestFactory', 'EntryFactory', function($scope, fileReader, $upload, $stateParams, $state, ContestFactory, EntryFactory) {
		console.log('EntrySubmitCtrl loaded...');
		console.log($stateParams);
		$scope.contest = { contestType : "text" };
		ContestFactory.getContestById($stateParams.id)
			.then(function(response) {
				$scope.contest = response.contest;
			})
		$scope.title = "My title";
		$scope.file = null;
		console.log(fileReader)
		$scope.getFile = function () {
			$scope.progress = 0;
			fileReader.readAsDataUrl($scope.file, $scope)
				.then(function(result) {
					$scope.imageSrc = result;
				});
			};
		$scope.$on("fileProgress", function(e, progress) {
			$scope.progress = progress.loaded / progress.total;
		});
		$scope.onFileSelect = function($files) {
			for (var i = 0; i < $files.length; i++) {
				$scope.file = $files[i];
				console.log($scope.file);
			}
		};
		$scope.submit = function() {
			if ($scope.contest.contestType == "image") {
				$scope.upload = $upload.upload({
					method: 'POST',
					url: '/api/contest/entry',
					data: { id: $stateParams.id, 
							title: $scope.title, 
							contest: $stateParams.id
						},
					file: $scope.file
				}).progress(function(evt) {
					console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
				}).success(function(data, status, headers, config) {
	    			console.log(data);
	    			$state.go('compete.home');
	  			});
			} else {
				console.log("textin' it up textin' it up textin' it up  textin' it up textin' it up textin' it up textin' it up");
				var postData = {
					contest: $scope.contest._id,
					content: $scope.entryText
				};
				EntryFactory.addTextEntry(postData)
					.then(function(response) {
						$state.go('compete.home');
					})			
			}
		};
	}])

	.controller('EntryPlayByPlayCtrl', ['$scope', '$stateParams', '$state', 'EntryFactory', function($scope, $stateParams, $state, EntryFactory) {
		console.log('EntryPlayByPlayCtrl loaded...');
		$scope.entries = [];
		$scope.activeEntry = null;
		EntryFactory.getEntryStandingsByEntry($stateParams.id)
			.then(function(response) {
				$scope.entries = response.entries;
				for(var i=0; i<$scope.entries.length; i++) {
					if ($scope.entries[i]._id == $stateParams.id) $scope.activeEntry = $scope.entries[i];
				}
			})
	}])