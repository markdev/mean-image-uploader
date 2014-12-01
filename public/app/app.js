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
        // this is a hacky way to do a redirect, but $state.go() doesn't work for some reason
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (jQuery.isEmptyObject($rootScope.currentUser) && toState.name != 'login' && toState.name != 'signup') {
                window.location.replace('/login');
            }
        })
	})

// end file
;


(function (module) {
    var fileReader = function ($q, $log) {
        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
        var onProgress = function(reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };
        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };
        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
            var reader = getReader(deferred, scope);         
            reader.readAsDataURL(file);
            return deferred.promise;
        };
        return { readAsDataUrl: readAsDataURL };
    };
    module.factory("fileReader", ["$q", "$log", fileReader]);
}(angular.module("yote")));
