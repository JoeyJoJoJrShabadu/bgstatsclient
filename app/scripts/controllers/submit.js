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
    $scope.playerScores = [];
  	var basePlayers = Restangular.all('players/');
  	var basePlayerScores = Restangular.all('playerscores/')
  	var basePlayerPlaces = Restangular.all('playerplaces/')
  	var baseGames = Restangular.all('boardgames/');
  	var baseLocations = Restangular.all('locations/');
  	var baseInstance = Restangular.all('gameinstances/');
  	
  	$scope.refresh = function() {
  		$scope.gameinstance = {};
  		$scope.success = false;
			$scope.error = false;
			$scope.errorText = "";
			$scope.successText = "";
      $scope.newPlayer = '';
      $scope.newScore = '';
  		
  		$scope.dt = new Date();
	  	basePlayers.getList().then(function(players) {
	  	  $scope.allPlayers = players;
	  	});
	  	
	  	baseGames.getList().then(function(games) {
	  	  $scope.allGames = games;
	  	});
	
	  	baseLocations.getList().then(function(locations) {
	  	  $scope.allLocations = locations;
	  	});
  	}
  	
  	$scope.refresh();
  	
  	$scope.submitGame = function() {
  		$scope.gameinstance.playerplace = [];
  		$scope.gameinstance.playerscore = $scope.playerScores;
  		$scope.gameinstance.date = $scope.dt.toJSON();
  		var idx = 1;
  		
  		$scope.playerScores.map(function(i)
  		{
  			var newPlayerPlace = {player:i.player, place:idx};
  	    $scope.gameinstance.playerplace.push(newPlayerPlace);
  			idx += 1;
  		});
  		
  		baseInstance.post($scope.gameinstance).then(function(newGI) {
  			$scope.success = true;
  			$scope.error = false;
  			$scope.successText = newGI.boardgame + " at " + newGI.location + " on " + newGI.date + " submitted";
  			$scope.playerScores = [];
  			$scope.gameinstance = {};
  			
  		}, function(response) {
  			$scope.error = true;
  			$scope.errorText = "Failed to submit " + response.status + " " + response.statusText;
  		});
  	};
  	
  	$scope.open = function($event) {
  		$event.preventDefault();
  		$event.stopPropagation();
  		
  		$scope.opened = true;
  	};
  	
    $scope.addPlayerScore = function(newPlayer, newScore) {
  	  var newPlayerScore = {player:newPlayer, score:newScore};
		    $scope.playerScores.push(newPlayerScore);
    };
	 
	   $scope.addPlayer = function(){
	  	 $scope.addPlayerScore({name:$scope.newPlayer}, $scope.newScore);
	     $scope.newPlayer = '';
	     $scope.newScore = '';
		 };
		  
	 $scope.removePlayer = function(index) {
		 $scope.players.splice(index, 1);
	 };
});
  


