console.log("loaded: sunzora directives");

'use strict'

angular
	.module('yote')

	.directive("ngFileSelect", function() {    
		return {
			link: function($scope,el) {
				el.bind("change", function(e) {
					$scope.file = (e.srcElement || e.target).files[0];
					$scope.getFile();
				});
			}
		}
	})

	.directive('scroller', function ($rootScope) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.bind('scroll', function () {
					scope.findCenterImage();
					$rootScope.$broadcast('someEvent', {
						data: "valueToPass"
					});
				});
			}
		};
	})

	.directive('entryFrame', function() {
		return {
			//require 'scroller',
			restrict: 'E',
			scope: {
				entry: '='
			},
			replace: true,
			template: '<div><div class="imageFrame"><img ng-src="/api/entry/realContent/{{entry._id}}" /></div></div>',
			link: function(scope, element, attrs) {
				element.bind("click", function() {
					console.log(element.position().left);
				})
				scope.$on('someEvent', function (event, result) {
					scope.receivedData = result.data;
					console.log(element.position().left);
				});
			},
			controller: function($scope) {
				console.log($scope.entry);
				/*
				$scope.$on('someEvent', function (event, result) {
					$scope.receivedData = result.data;
					console.log(element);
				});
				*/
			}
		}
	})
	;