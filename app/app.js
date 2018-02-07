// Root module
var app = angular.module('coffeeDispenserApp', ["ngRoute"]);

// Routing configuration
app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "templates/main.template.html",
			controller: "mainController"
		})
		.otherwise({ redirectTo: '/' })
});

