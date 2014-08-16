'use strict';

/**
 * @ngdoc function
 * @name bgcApp.controller:SubmitCtrl
 * @description
 * # SubmitCtrl
 * Controller of the bgcApp
 */
angular.module('bgcApp')
  .controller('SubmitCtrl', function ($scope, Restangular) {
        $scope.names = ['john', 'bill', 'charlie', 'robert', 'adrian'];	
  	var basePlayers = Restangular.all('players');
  	var baseGames = Restangular.all('boardgames');
  	var baseLocations = Restangular.all('locations');
  	
  	basePlayers.getList().then(function(players) {
  	  $scope.allPlayers = players;
  	});
  	
  	baseGames.getList().then(function(games) {
  	  $scope.allGames = games;
  	});

  	baseLocations.getList().then(function(locations) {
  	  $scope.allLocations = locations;
  	});
  	
  	$scope.today = function() {
  		$scope.dt = new Date();
  	};
  	$scope.today();
  	
  	$scope.open = function($event) {
  		$event.preventDefault();
  		$event.stopPropagation();
  		
  		$scope.opened = true;
  	};
	$scope.addPlayer = function(){
		var player = {name:$scope.newPlayer, score:$scope.newScore};
	  	$scope.players.push(player);
	  	$scope.newPlayer = '';
	  	$scope.newScore = '';
	};
	  
	$scope.removePlayer = function(index) {
		$scope.players.splice(index, 1);
	  };
	  $scope.players = [{name:'Adrian', score:'5'}, {name:'Chris', score:'4'}];
  })
  .directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
      iElement.autocomplete({
        source: scope[iAttrs.uiItems],
        select: function() {
          $timeout(function() {
            iElement.trigger('input');
          }, 0);
        }
      });
    };
  });


