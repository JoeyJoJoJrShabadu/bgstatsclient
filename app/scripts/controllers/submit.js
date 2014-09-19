'use strict';

/**
 * @ngdoc function
 * @name bgcApp.controller:SubmitCtrl
 * @description
 * # SubmitCtrl
 * Controller of the bgcApp
 */
var module = angular.module('bgcApp')
module.directive('file', function(){
    return {
        scope: {
            file: '='
        },
        link: function(scope, el, attrs){
            el.bind('change', function(event){
                var files = event.target.files;
                var file = files[0];
                scope.file = file ? file.name : undefined;
                scope.$apply();
            });
        }
    };
});
module.controller('SubmitCtrl', function ($scope, Restangular) {
    $scope.names = ['john', 'bill', 'charlie', 'robert', 'adrian'];	
  	var basePlayers = Restangular.all('players/');
  	var basePlayerScores = Restangular.all('playerscores/')
  	var basePlayerPlaces = Restangular.all('playerplaces/')
  	var baseGames = Restangular.all('boardgames/');
  	var baseLocations = Restangular.all('locations/');
  	var baseInstance = Restangular.all('gameinstances/');
  	
  	$scope.refresh = function() {
  		$scope.players = [];
  		$scope.playerSorted = [];
      $scope.playerScores = [];
      $scope.playerPlaces = [];
  		$scope.gameinstance = {};
  		$scope.success = false;
			$scope.error = false;
			$scope.errorText = "";
			$scope.successText = "";
      $scope.newPlayer = '';
      $scope.newScore = '';
  		
  		$scope.dt = new Date();
  		
	  	basePlayers.withHttpConfig().getList().then(function(players) {
	  	  $scope.allPlayers = players;
	  	});
	  	
	  	baseGames.withHttpConfig().getList().then(function(games) {
	  	  $scope.allGames = games;
	  	});
	
	  	baseLocations.withHttpConfig().getList().then(function(locations) {
	  	  $scope.allLocations = locations;
	  	});
  	}
  	
  	$scope.refresh();
  	
  	$scope.getFile = function() {
  		fileReader = new FileReader();
  	};
  	
  	$scope.submitGame = function() {
  		$scope.gameinstance.playerplace = [];
  		$scope.gameinstance.playerscore = [];
  		$scope.gameinstance.playerorder = [];
  		$scope.gameinstance.date = $scope.dt.toJSON().substring(0,10);
  		
  	  for (var i = 0; i < $scope.players.length; i++) {
  	    $scope.gameinstance.playerplace.push({player:$scope.players[i].player, place:$scope.players[i].place});
  	    $scope.gameinstance.playerorder.push({player:$scope.players[i].player, order:$scope.players[i].order});
 	      if ($scope.players[i].score != "") {
 	      	$scope.gameinstance.playerscore.push({player:$scope.players[i].player, score:$scope.players[i].score});
 	      }
 	    }
  	  var fd = new FormData();
  	  fd.append("gi", angular.toJson($scope.gameinstance));
  	  fd.append("file", 'test');
  	  baseInstance.withHttpConfig({transformRequest: angular.identity}).customPOST(fd,
  	  												'',
  	  												undefined,
  	  												{'Content-Type':undefined}).then(function(newGI) {
  		//baseInstance.post($scope.gameinstance).then(function(newGI) {
  			$scope.success = true;
  			$scope.error = false;
  			$scope.successText = newGI.boardgame + " at " + newGI.location + " on " + newGI.date + " submitted";
  			$scope.players = [];
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
  	
    $scope.addNewPlayer = function(newPlayer, newScore, newPlace) {
  	  var newPlayerScore = {player:newPlayer, score:newScore, place:newPlace};
		    $scope.playerSorted.push(newPlayerScore);
    };
	 
	   $scope.addPlayer = function(){
	  	 $scope.addNewPlayer({name:$scope.newPlayer}, $scope.newScore, $scope.newPlace);
	     $scope.newPlayer = '';
	     $scope.newScore = '';
	     $scope.newPlace = '';
		 };
		  
	   $scope.removePlayer = function(index) {
		   $scope.playerSorted.splice(index, 1);
	   };
	   
	   $scope.$watch('playerSorted', function (value) {
	  	 var idx = 1;
	  	 $scope.players = [];
	  	 $scope.playerSorted.map(function(i) {
         $scope.players.push({player:i.player, place:i.place, score:i.score, order:idx})
	  	   idx += 1;
	  	 });
	   }, true);
});
  


