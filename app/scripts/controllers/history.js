'use strict';

/**
 * @ngdoc function
 * @name bgcApp.controller:HistoryCtrl
 * @description
 * # History Ctrl
 * Controller of the bgcApp
 */
angular.module('bgcApp')
.controller('HistoryCtrl', function ($scope, $filter, ngTableParams, Restangular) { 
	var baseInstance = Restangular.all('gameinstances/');
	
	$scope.filterTypes = [{name:'boardgame', base:Restangular.all('boardgames/')},
	                      {name:'location', base:Restangular.all('locations/')},
	                      		{name:'player', base:Restangular.all('players/')}];
	
	$scope.filterType = $scope.filterTypes[0];
	
	
	$scope.setTable = function(gameinstance) {
		$scope.allGames = [];
		for (var i = 0; i < gameinstance.length; i++) {
	 		var gi = new Object();
	 		gi.boardgame = gameinstance[i].boardgame;
	 		gi.location = gameinstance[i].location;
	 		gi.date = gameinstance[i].date;
	 		gi.scores = "";
	 		gi.places = "";
	 		
	 		for (var j = 0; j < gameinstance[i].playerscore.length; j++){
	 			gi.scores = gi.scores + gameinstance[i].playerscore[j] + "\n";
	 		}
	 		
	 		
	 		for (var j = 0; j < gameinstance[i].playerplace.length; j++){
	 			gi.places = gi.places + gameinstance[i].playerplace[j] + "\n";
	 		}
	 		$scope.allGames.push(gi)
	 	}
	}
	
	$scope.$watch('filterType', function (newVal) {
		newVal.base.getList().then( function( result) {
  	  $scope.filterValues = result; 	  
  	});
	}, true);
	
	$scope.$watch('filterText', function (newVal) {
		var query = new Object();
	  query[$scope.filterType.name] = $scope.filterText.name;
	  
	  baseInstance.getList(query).then(function(gameinstance) {
	  	$scope.setTable(gameinstance);
	  });
	}, true);
	
	$scope.removeFilter = function (){
	  $scope.allGames = [];
		baseInstance.getList().then(function(gameinstance) {
			$scope.setTable(gameinstance)
		});
	}
	
	$scope.removeFilter();
	
	
	$scope.tableParams = new ngTableParams({
	    page: 1,            // show first page
	    count: 10,          // count per page
	    sorting: {
	    	date: 'asc'
	    },
	    filter: {
	    	boardgame: 'R'
	    }
	 }, {
	    total: $scope.allGames.length, // length of data
	    getData: function($defer, params) {
	        // use build-in angular filter
	        var orderedData = params.sorting() ?
	               $filter('orderBy')($scope.allGames, params.orderBy()) : $scope.allGames;

	        $scope.gis = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

	        $defer.resolve($scope.gis);
	    }
	   });
	
});
