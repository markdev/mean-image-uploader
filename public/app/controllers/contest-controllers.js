console.log("loaded: contest controllers");

angular
	.module('yote')

	.controller('ContestCreateNewCtrl', ['$scope', '$stateParams', '$state', '$location', 'ContestFactory', function($scope, $stateParams, $state, $location, ContestFactory){
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
		//$scope.contests = [{"_id" : 0, "title" : "no contests yet"}];
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
				})
		}
	}])
