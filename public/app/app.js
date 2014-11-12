'use strict'

console.log('angular application loaded');

angular
	.module('yote', [
		// add in custom dependencies here
		  'ngRoute'
		, 'ngTouch'
		, 'ui.router'
		, 'angularFileUpload'
	])
	.run(function($rootScope) {
		$rootScope.currentUser = window.currentUser;
		console.log($rootScope.currentUser);
		console.log("howdy!");
	})

// end file
;
