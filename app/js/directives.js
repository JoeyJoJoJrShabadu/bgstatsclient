'use strict';

/* Directives */


angular.module('bgstatsClient.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
