console.log("loaded: user controllers");

angular
	.module('yote')

	.controller('SunzoraCtrl', ['$scope', '$stateParams', '$state', '$location', 'SunzoraFactory', function($scope, $stateParams, $state, $location, SunzoraFactory){
		console.log('SunzoraCtrl loaded...');
	}])

	.controller('UserLogoutCtrl', ['$scope', '$stateParams', '$state', '$location', 'SunzoraFactory', 'UserFactory', function($scope, $stateParams, $state, $location, SunzoraFactory, UserFactory){
		$scope.logout = function() {
			//console.log("logging out");
			UserFactory.logout()
				.then(function(data) {
					//console.log(data);
					$state.go('login')
				})

		}
	}])

	.controller('UserSignupCtrl', ['$scope', '$stateParams', '$state',  '$rootScope', '$location', 'SunzoraFactory', 'UserFactory', function($scope, $stateParams, $state, $rootScope, $location, SunzoraFactory, UserFactory){
		$scope.email = 'mark.karavan@gmail.com';
		$scope.password = 'mark';
		$scope.password2 = 'mark';
		$scope.signup = function() {
			var postData = {};
			postData.email = $scope.email;
			postData.password = $scope.password;
			postData.password2 = $scope.password2;
			//console.log(postData);
			UserFactory.signup(postData)
				.then(function(data) {
					//console.log(data);
					if (data.success) {
						//console.log(data);
						$rootScope.currentUser = data.user;
						$state.go('root.home');
					} else {
						console.log("fail");
					}
				})
		}
	}])

	.controller('UserLoginCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'SunzoraFactory', 'UserFactory', function($scope, $stateParams, $state, $rootScope, SunzoraFactory, UserFactory) {
		$scope.email = "mark.karavan@gmail.com";
		$scope.password = "mark";
		$scope.loginAction = function() {
			var postData = {};
			postData.email = $scope.email;
			postData.password = $scope.password;
			UserFactory.login(postData)
				.then(function(data) {
					//console.log(data);
					if (data.success) {
						$rootScope.currentUser = data.user;
						$state.go('root.home');
					} else {
						console.log("fail");
					}
				})
		}
	}])

	.controller('UserChangePasswordCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UserFactory', function($scope, $stateParams, $state, $rootScope, UserFactory) {  
		$scope.currentPassword = "";
		$scope.newPassword = "";
		$scope.confirmPassword = "";
		$scope.submit = function() {
			var postData = {};
			postData.email = currentUser.email;
			postData.password = $scope.newPassword;
			UserFactory.changePassword(postData)
				.then(function(data) {
					if (data.success) {
						$state.go('root.home');
					} else {
						console.log("fail");
					}
				});
		}
	}])
/*
	.controller('UserAccountSettingsCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'UserFactory', function($scope, $stateParams, $state, $rootScope, UserFactory) {  
		$scope.firstName = "";
		$scope.lastName = "";
		$scope.update = function(files) {
			console.log(files);
			var fd = new FormData();
			//Take the first selected file
			fd.append("file", files[0]);
			console.log('updating user');
		};
	}])
*/

	.controller('UserAvatarUploadCtrl', ['$scope', 'fileReader', '$upload', '$stateParams', '$state', '$rootScope', 'UserFactory', function($scope, fileReader, $upload, $stateParams, $state, $rootScope, UserFactory) {  
		$scope.file = null;
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
		$scope.update = function() {
			console.log("SUBMITT");
			$scope.upload = $upload.upload({
				method: 'POST',
				url: '/api/user/avatar',
				data: { id: currentUser._id },
				file: $scope.file
			}).progress(function(evt) {
				console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
			}).success(function(data, status, headers, config) {
    			console.log(data);
    			$state.go('settings.home');
  			});
		};

	}])

	.controller('UserResultsCtrl', ['$scope', 'fileReader', '$upload', '$stateParams', '$state', '$rootScope', 'UserFactory', function($scope, fileReader, $upload, $stateParams, $state, $rootScope, UserFactory) {  
		$scope.results = [
			{
				"_id" : "54758ec59defce4187b27b3b",
				"_owner" : "546afef99ea23d9bdd46e476",
				"entry" : "5472e97e828f71217ec3e0eb",
				"contest" : "5472e830538835e87bf7ceed",
				"deadline" : "2014-01-01T05:00:00Z",
				"score" : 0,
				"rank" : 10,
				"totalEntries" : 11,
				"totalVotes" : 2,
				"title" : "peacock"
			},
			{
				"_id" : "54758ec59defce4187b27b3a",
				"_owner" : "546afef99ea23d9bdd46e476",
				"entry" : "5472ebe0efab195e801b6536",
				"contest" : "5472e830538835e87bf7ceed",
				"deadline" : "2014-01-01T05:00:00Z",
				"score" : 0.5,
				"rank" : 9,
				"totalEntries" : 11,
				"totalVotes" : 2,
				"title" : "trickster fairie"
			},
		];
	}])

