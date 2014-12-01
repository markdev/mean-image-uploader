console.log("loaded: user controllers");

angular
	.module('yote')

	.controller('UserLogoutCtrl', ['$scope', '$state', 'UserFactory', function($scope, $state, UserFactory) {
		$scope.logout = function() {
			UserFactory.logout()
				.then(function(data) {
					//console.log(data);
					$state.go('login')
				})

		}
	}])

	.controller('UserSignupCtrl', ['$scope', '$state', '$rootScope', 'UserFactory', function($scope, $state, $rootScope, UserFactory){
		$scope.email = 'mark.karavan@gmail.com';
		$scope.password = 'mark';
		$scope.password2 = 'mark';
		$scope.signup = function() {
			var postData = {};
			postData.email = $scope.email;
			postData.password = $scope.password;
			postData.password2 = $scope.password2;
			UserFactory.signup(postData)
				.then(function(data) {
					if (data.success) {
						$rootScope.currentUser = data.user;
						$state.go('root.home');
					} else {
						console.log("fail");
					}
				})
		}
	}])

	.controller('UserLoginCtrl', ['$scope', '$state', '$rootScope', 'UserFactory', function($scope, $state, $rootScope, UserFactory) {
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

	.controller('UserChangePasswordCtrl', ['$scope', '$state', 'UserFactory', function($scope, $state, UserFactory) {  
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

	.controller('UserAvatarUploadCtrl', ['$scope', 'fileReader', '$upload', '$state', function($scope, fileReader, $upload, $state) {  
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

	.controller('UserResultsCtrl', ['$scope', 'ResultFactory', function($scope, ResultFactory) {  
		console.log('UserResultsCtrl');
		$scope.results = [];
		ResultFactory.getResultsByUser()
			.then(function(response) {
				$scope.results = response.results;
			})
	}])

