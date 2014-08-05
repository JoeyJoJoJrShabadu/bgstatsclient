'use strict';


// Declare app level module which depends on filters, and services
angular.module('bgstatsClient', [
  'bgstatsClient.filters',
  'bgstatsClient.services',
  'bgstatsClient.directives',
  'bgstatsClient.controllers',
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.sortable'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.when('/latest', {templateUrl: 'partials/latest.html', controller: 'LatestCtrl'});
  $routeProvider.when('/stats', {templateUrl: 'partials/stats.html', controller: 'StatsCtrl'});
  $routeProvider.when('/submit', {templateUrl: 'partials/submit.html', controller: 'SubmitCtrl'});
  $routeProvider.otherwise({redirectTo: '/latest'});
}]);
