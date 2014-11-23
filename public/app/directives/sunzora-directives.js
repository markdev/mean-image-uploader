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
					$rootScope.$broadcast('scroll');
				});
			}
		};
	})

	.directive('entryFrame', function($compile, $rootScope) {
		return {
			restrict: 'E',
			scope: {
				entry: '=',
				callFocus: '&'
			},
			replace: true,
			template: '<div><div class="imageFrame"><img ng-src="/api/entry/realContent/{{entry._id}}" /></div></div>',
			link: function(scope, element, attrs) {
				element.bind("click", function() {
					console.log(element.position().left);
				})
				scope.$on('scroll', function (event, result) {
					var imageFrame = element.find('.imageFrame');
					if (element.position().left > 200 && element.position().left < 560) {
						scope.callFocus();
						imageFrame.addClass('active');
						$compile(imageFrame)(scope);
		     			$rootScope.$broadcast('testEvent');
					} else {
						if (imageFrame.hasClass('active')) {
                    		imageFrame.removeClass('active');
                    	}
					}
		     		scope.$apply();
				});
			},
			controller: function($scope) {
			}
		}
	})

	.directive('rateButton', function() {
		return {
			restrict: 'E',
			scope: {
				value: '=',
				rate: '&'  // let's cycle through the options
			},
			replace: true,
			template: '<div><button id="star{{value}}" ng-click="rate({{value}})">{{value}}</button></div>',
			link: function(scope, element, attrs) {
				element.bind("click", function(e) {
					//scope.$apply($scope.rate(2));
					scope.rate();
				})
				scope.$on('testEvent', function(event, data) {
					console.log("I am tested");
				});
			}
		}
	})
	;