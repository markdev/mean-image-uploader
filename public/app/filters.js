'use strict'

console.log('angular filters loaded');

angular
  .module('yote')

  .filter('reverse', function() {
    return function(text) {
      // avoid an exception being thrown during dirty checking before the state is defined
      if(!text)
        return false;
      else 
        return text.split("").reverse().join("");
    }
  })

// end file
;