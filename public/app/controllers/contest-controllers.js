console.log("loaded: contest controllers");

angular
	.module('yote')

	.controller('ContestCreateNewCtrl', ['$scope',  '$upload', 'fileReader', '$stateParams', '$state', '$location', 'ContestFactory', function($scope, $upload, fileReader, $stateParams, $state, $location, ContestFactory){
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
		$scope.contestTypes = ["image", "text"];
		$scope.contestType = $scope.contestTypes[0];
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
			postData.contestType = $scope.contestType;
			$scope.upload = $upload.upload({
				method: 'POST',
				url: '/api/contest/',
				data: postData,
				file: $scope.file
			}).progress(function(evt) {
				console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
			}).success(function(data, status, headers, config) {
    			console.log(data);
    			$state.go('create.home');
  			});
		};
	}])

	.controller('ContestSearchCtrl', ['$scope', 'ContestFactory', function($scope, ContestFactory) {
		console.log('ContestSearchCtrl loaded...');
		$scope.contests = [];
		$scope.find = function() {
			ContestFactory.getContestByString($scope.searchStr)
				.then(function(contests) {
					console.log(contests);
					$scope.contests = contests.contests;
				})
		}
	}])

	.controller('ContestListCtrl', ['$scope', 'ContestFactory', function($scope, ContestFactory) {
		console.log('ContestListCtrl loaded...');
		$scope.contests = [];
		var getContests = function() {
			ContestFactory.getContestsByOwner()
				.then(function(contests) {
					if (contests.success) {
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

	.controller('ContestJudgeCtrl', ['$scope', '$stateParams', 'EntryFactory', 'ContestFactory', function($scope, $stateParams, EntryFactory, ContestFactory){
		console.log('ContestJudgeCtrl loaded...');
		ContestFactory.getContestById($stateParams.id)
			.then(function(response) {
				$scope.contest = response.contest;
			})
		$scope.entries = [];
		$scope.entryScoreMap = []; //boy this is sloppy
		$scope.existingEntries = [];
		$scope.activeEntry = null;
		$scope.activeEntryKey = null;
		$scope.scores = [1,2,3,4,5,6,7,8,9,10];
		$scope.loadNewEntry = function() {
			var postData = {};
			postData.cId = $stateParams.id;
			postData.existingEntries = $scope.existingEntries;
			EntryFactory.loadNewEntry(postData)
				.then(function(entry) {
					if (entry.entry !== null && $scope.existingEntries.indexOf(entry.entry._id) == -1) {
						$scope.entries.push(entry.entry);
						$scope.existingEntries.push(entry.entry._id);
						$scope.entryScoreMap.push({_id: entry.entry._id, score: null});
					}
				})
		}
		$scope.loadNewEntry();
		$scope.$on('loadANewEntry', function() {
			$scope.loadNewEntry();
		});
		$scope.callFocus = function(key) {
			$scope.activeEntry = $scope.entryScoreMap[key]
			$scope.activeEntryKey = key;
			console.log($scope.activeEntry);
		}
		$scope.rate = function(score) {
			console.log($scope.activeEntry);
			var postData = {};
			postData.score = score;
			postData.eId = $scope.activeEntry._id;
			EntryFactory.addRating(postData)
				.then(function(result) {
					console.log(result);
					$scope.entryScoreMap[$scope.activeEntryKey].score = score;
				})
		}
	}])

	.controller('ContestJudgeListCtrl', ['$scope', 'ContestFactory', function($scope, ContestFactory){
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

	.controller('ContestCompeteListCtrl', ['$scope', 'ContestFactory', 'EntryFactory', function($scope, ContestFactory, EntryFactory) {
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

	// Shit show, refactor later
	.controller('ContestEditCtrl', ['$scope', '$timeout', '$upload', '$stateParams', '$state', '$location', 'ContestFactory', function($scope, $timeout, $upload, $stateParams, $state, $location, ContestFactory){
		console.log('ContestEditCtrl loaded...');
		$scope.id = $stateParams.id;
		var imageUpdate = function() {
			$timeout(function () {
				$scope.path = path + '/api/contest/banner/' + $scope.contest._id;
			}, 1000);
		};
		var path = 'http://127.0.0.1:2345'; // TODO change this obv
		ContestFactory.getContestById($scope.id)
			.then(function(response) {
				console.log(response);
				$scope.contest = response.contest;
				//removes beginning and ending square brackets and double quotes.
				var tagString = response.contest.tags.join(", ").substring(1);
				$scope.contest.tags = tagString.substring(0, tagString.length - 1).replace(/['"]+/g, '');
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

	.controller('ContestJoinCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'ContestFactory', function($scope, $rootScope, $stateParams, $state, ContestFactory){
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
					$state.go("compete.submit", {id: $stateParams.id });
				})
		};
	}])
	;
