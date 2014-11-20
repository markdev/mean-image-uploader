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

	.directive("scroll", function ($window) {
		return function(scope, element, attrs) {
			angular.element($window).bind("scroll", function() {
				scope.visible = false;
				console.log("spuh");
				scope.$apply();
			});
		};
	});
	;