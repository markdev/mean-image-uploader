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

	.directive('scroller', function () {
		return {
			restrict: 'A',
			link: function (scope, elem, attrs) {
				elem.bind('scroll', function () {
					console.log("PEE PEE!!!");
				});
			}
		};
	})
	;