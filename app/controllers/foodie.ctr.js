"use strict";

app.controller("foodieCtrl", function($scope, $http, foodieFactory) {

	foodieFactory.getFood().then(function(fooditems) {
		$scope.fooditems = fooditems.data;
	})
});