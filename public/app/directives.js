'use strict'

console.log('angular directives loaded');

angular
  .module('app')
  
  .directive("enter", function() {
    return function(scope, element, attrs) {
        element.bind("mouseenter", function() {
          // scope.$apply(attrs.enter);
          console.log("this is working!");
        });
    };
  })

/*
  .directive("ytRow", function(){
    return {
      restrict: 'E'
      , transclude: true
      , template: '<div yt-row ng-transclude> </div>'
    };
  })
*/

// end of the file
;






