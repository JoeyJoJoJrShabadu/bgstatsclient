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
      .when('/auth', {
        templateUrl: 'views/auth.html',
        controller: 'AuthCtrl'
      }) 
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://127.0.0.1:8000/bg');
  })
  .config(['$httpProvider', function($httpProvider){
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	}])
	.factory('api', function($resource){
		function add_auth_header(data, headersGetter){
			var headers = headersGetter();
			headers['Authorization'] = ('Basic ' + btoa(data.username + ':' + data.password));
		}
		return {
			auth: $resource('http://127.0.0.1:8000/api/auth\\/', {}, {
				login: {method: 'POST', transformRequest: add_auth_header},
				logout: {method: 'DELETE'}
			}),
			users: $resource('http://127.0.0.1:8000/api/users\\/', {}, {
				create: {method: 'POST'}
			})
		};
	});
