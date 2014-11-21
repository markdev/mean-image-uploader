console.log("loaded: contest controllers");

angular
	.module('yote')

	.controller('ContestCreateNewCtrl', ['$scope',  'fileReader', '$stateParams', '$state', '$location', 'ContestFactory', function($scope, fileReader, $stateParams, $state, $location, ContestFactory){
		console.log('ContestCreateNewCtrl loaded...');
		$scope.title = "Cat Pics";
		$scope.tags = "Felines, Cats, Kitties";
		$scope.rules = "Must be a cute kitty";
		$scope.submissionAvailability = "owner";
		$scope.submissionLimit = "many";
		$scope.months = [ {name: "Jan"}, {name: "Feb"}, {name: "Mar"}, {name: "Apr"}, {name: "May"}, {name: "Jun"}, {name: "Jul"}, {name: "Aug"}, {name: "Sep"}, {name: "Oct"}, {name: "Nov"}, {name: "Dec"} ];
		$scope.myMonth = $scope.months[0];
		$scope.days = [ {name: "1"}, {name: "2"}, {name: "3"}, {name: "4"}, {name: "5"}, {name: "6"}, {name: "7"}, {name: "8"}, {name: "9"}, {name: "10"}, {name: "11"}, {name: "12"}, {name: "13"}, {name: "14"}, {name: "15"}, {name: "16"}, {name: "17"}, {name: "18"}, {name: "19"}, {name: "20"}, {name: "21"}, {name: "22"}, {name: "23"}, {name: "24"}, {name: "25"}, {name: "26"}, {name: "27"}, {name: "28"}, {name: "29"}, {name: "30"}, {name: "31"} ];
		$scope.myDay = $scope.days[0];
		$scope.years = [{name: "2014"}, {name: "2015"}, {name: "2016"}];
		$scope.myYear = $scope.years[0];
		$scope.hours = [ {name: "00"}, {name: "01"}, {name: "02"}, {name: "03"}, {name: "04"}, {name: "05"}, {name: "06"}, {name: "07"}, {name: "08"}, {name: "09"}, {name: "10"}, {name: "11"}, {name: "12"}, {name: "13"}, {name: "14"}, {name: "15"}, {name: "16"}, {name: "17"}, {name: "18"}, {name: "19"}, {name: "20"}, {name: "21"}, {name: "22"}, {name: "23"} ];
		$scope.myHour = $scope.hours[0];
		$scope.minutes = [ {name: "00"}, {name: "05"}, {name: "10"}, {name: "15"}, {name: "20"}, {name: "25"}, {name: "30"}, {name: "35"}, {name: "40"}, {name: "45"},{name: "50"},{name: "55"} ];
		$scope.myMinute = $scope.minutes[0];
		$scope.create = function() {
			var deadline = 'Sat ';
			deadline += $scope.myMonth.name + ' ';
			deadline += $scope.myDay.name + ' ';
			deadline += $scope.myYear.name + ' ';
			deadline += $scope.myHour.name + ':';
			deadline += $scope.myMinute.name + ':00 GMT-0500 (EST)';
			var postData = {};
			postData.deadline = deadline;
			postData.title = $scope.title;
			postData.submissionAvailability = $scope.submissionAvailability;
			postData.submissionLimit = $scope.submissionLimit;
			postData.tags = [];
			$.each($scope.tags.split(','), function() {
    			postData.tags.push($.trim(this).toLowerCase());
			});
			postData.rules = $scope.rules;
			ContestFactory.create(postData)
				.then(function(data) {
					if (data.success) {
						$state.go('create.home');
					} else {
						console.log("fail");
					}					
				})
		};
	}])

	.controller('ContestSearchCtrl', ['$scope', '$stateParams', '$state', '$location', 'ContestFactory', function($scope, $stateParams, $state, $location, ContestFactory){
		console.log('ContestSearchCtrl loaded...');
		$scope.contests = [];
		$scope.find = function() {
			console.log("FIND");
			ContestFactory.getContestByString($scope.searchStr)
				.then(function(contests) {
					console.log(contests);
					$scope.contests = contests.contests;
				})
		}
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

	.controller('ContestJudgeCtrl', ['$scope', '$stateParams', '$state', '$location', 'ContestFactory', 'EntryFactory', function($scope, $stateParams, $state, $location, ContestFactory, EntryFactory){
		console.log('ContestJudgeCtrl loaded...');
		ContestFactory.getContestById($stateParams.id)
			.then(function(result) {
				$scope.contest = result.contest;
			})
		$scope.myClass = "active";
		$scope.entries = [];
		EntryFactory.getEntriesByContest($stateParams.id)
			.then(function(result) {
				$scope.entries = result.entries;
				console.log($scope.entries);
			})
		$scope.getNewEntry = function() {
			console.log("Getting a new entry");
		}
		$scope.rate = function(score) {
			console.log(score);
		}
		$scope.scroll = function() {
			console.log("scrolling");
		}
		$scope.test = function() {
			console.log("testing the scroll function");
		}
	}])

	.controller('ContestJudgeListCtrl', ['$scope', '$stateParams', '$state', '$location', 'ContestFactory', function($scope, $stateParams, $state, $location, ContestFactory){
		console.log('ContestJudgeListCtrl loaded...');
		$scope.contests = [];
		var getContests = function() {
			ContestFactory.getContestsByJudge()
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
	}])

	.controller('ContestCompeteListCtrl', ['$scope', '$stateParams', '$state', '$location', 'ContestFactory', 'EntryFactory', function($scope, $stateParams, $state, $location, ContestFactory, EntryFactory){
		console.log('ContestCompeteListCtrl loaded...');
		$scope.contests = [];
		$scope.contestsSubmittable = [];
		EntryFactory.getContestsByCompetitor()
			.then(function(entries) {
				if (entries.success) {
					console.log(entries);
					$scope.contests = entries.entries;
				} else {
					console.log("fail");
				}		
			})
		ContestFactory.getSubmittableContestsByCompetitor()
			.then(function(contests) {
				if (contests.success) {
					console.log(contests);
					$scope.contestsSubmittable = contests.contests;
				} else {
					console.log("fail");
				}	
			})
	}])

	.controller('ContestEditCtrl', ['$scope', '$timeout', '$upload', '$stateParams', '$state', '$location', 'ContestFactory', function($scope, $timeout, $upload, $stateParams, $state, $location, ContestFactory){
		console.log('ContestEditCtrl loaded...');
		$scope.id = $stateParams.id;
		var imageUpdate = function() {
			$timeout(function () {
				$scope.path = path + '/api/contest/banner/' + $scope.contest._id;
			}, 1000);
		};
		var path = 'http://127.0.0.1:3000'; // TODO change this obv
		ContestFactory.getContestById($scope.id)
			.then(function(response) {
				console.log(response);
				$scope.contest = response.contest;
				$scope.contest.tags = response.contest.tags.join(", ");
				imageUpdate();
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
        			imageUpdate();
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
					$state.go("create.home");
				})
		}
	}])

	.controller('ContestJoinCtrl', ['$scope', '$rootScope', '$timeout', '$upload', '$stateParams', '$state', '$location', 'ContestFactory', function($scope, $rootScope, $timeout, $upload, $stateParams, $state, $location, ContestFactory){
		console.log('ContestJoinCtrl loaded...');
		// possible states for competeState and judgeState:
		// 'already'
		// 'can'
		// 'cannot'
		$scope.competeState = 'cannot';
		$scope.judgeState = 'cannot';
		ContestFactory.getCompeteStateByUser($stateParams.id, $rootScope.currentUser._id)
			.then(function(competeState) {
				$scope.competeState = competeState;
			})
		ContestFactory.getJudgeStateByUser($stateParams.id, $rootScope.currentUser._id)
			.then(function(judgeState) {
				$scope.judgeState = judgeState;
			})
		$scope.judgeContest = function() {
			ContestFactory.addJudge($stateParams.id, $rootScope.currentUser._id)
				.then(function(result) {
					//console.log(result);
					$state.go("judge.contest", {id: $stateParams.id });
				})
		};
		$scope.competeInContest = function() {
			ContestFactory.addCompetitor($stateParams.id, $rootScope.currentUser._id)
				.then(function(result) {
					//console.log(result);
					$state.go("compete.submitEntry", {id: $stateParams.id });
				})
		};
	}])

	.controller('EntrySubmitCtrl', ['$scope', 'fileReader', '$rootScope', '$timeout', '$upload', '$stateParams', '$state', '$location', 'ContestFactory', function($scope, fileReader, $rootScope, $timeout, $upload, $stateParams, $state, $location, ContestFactory){
		console.log('EntrySubmitCtrl loaded...');
		console.log($stateParams);
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
		};
	}])
