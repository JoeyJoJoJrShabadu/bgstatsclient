'use strict';

/**
 * @ngdoc overview
 * @name bgcApp
 * @description
 * # bgcApp
 *
 * Main module of the application.
 */
angular
  .module('bgcApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'ui.bootstrap',
    'restangular',
    'ngTable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      }) 
      .when('/stats', {
        templateUrl: 'views/stats.html',
        controller: 'StatsCtrl'
      }) 
      .when('/submit', {
        templateUrl: 'views/submit.html',
        controller: 'SubmitCtrl'
      }) 
      .when('/history', {
        templateUrl: 'views/history.html',
        controller: 'HistoryCtrl'
      }) 
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://127.0.0.1:8000/bg');
  });
