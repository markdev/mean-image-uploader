// declare a module
var webappModule = angular.module('webapp', []);

// configure the module.
// in this example we will create a greeting filter
webappModule.filter('greet', function() {
	return function(name) {
		return 'Hello, ' + name + '!';
	};
});