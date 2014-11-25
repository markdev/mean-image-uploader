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

	.directive('scroller', function ($rootScope, $compile, $interpolate) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.bind('scroll', function () {
					angular.forEach(angular.element('.imageFrame'), function(value, key) {

						var entry = angular.element(value);
						//console.log(entry.position().left);
						if (entry.position().left > 200 && entry.position().left < 560) {
							scope.callFocus();
							entry.addClass('active');
							$compile(entry)(scope);
						} else {
							if (entry.hasClass('active')) {
	                    		entry.removeClass('active');
	                    	}
						}

						//a.addClass('ss');
					});
					//$rootScope.$broadcast('scrolling');
					//var frame = element.find('.imageFrame').each();
					//console.log(frame);

					/*
					for (var i=0; i<frames.length; i++) {
						console.log(frames[i]);
					}
					*/
					var callLimit = 600;
					var lPos = element.find('td.entryCell').last().position().left;
					if (lPos < callLimit) {
						$rootScope.$broadcast('loadANewEntry');
					}
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
				scope.$on('scrolling', function (event, result) {
					console.log("scrolling from directive");
					/*
					var imageFrame = element.find('.imageFrame');
					if (element.position().left > 200 && element.position().left < 560) {
						scope.callFocus();
						imageFrame.addClass('active');
						$compile(imageFrame)(scope);
					} else {
						if (imageFrame.hasClass('active')) {
                    		imageFrame.removeClass('active');
                    	}
					}
		     		scope.$apply();
		     		*/
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
				scope.$on('markAsRated', function(event, data) {
					var testId = "star" + data.score;
					var button = element.find("button");
					if (button.attr('id') == testId) {
						console.log(testId);
						button.addClass('clicked');
					} else {
						button.removeClass('clicked')
					}
				})
			}
		}
	})
	;