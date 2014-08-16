'use strict';

/**
 * @ngdoc function
 * @name bgcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bgcApp
 */
angular.module('bgcApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
