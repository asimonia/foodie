"use strict";

app.controller("foodieCtrl", function($scope, $http, foodieFactory, $mdSidenav, $mdToast, $mdDialog) {

	// returns a Promise
	foodieFactory.getFood().then(function(fooditems) {
		$scope.fooditems = fooditems.data;
		$scope.categories = getCategories($scope.fooditems);
	});

	var contact = {
		name: "Alex Simonian",
		phone: "(555) 555-5555",
		email: "alex.simonian@gmail.com"
	}

	$scope.openSidebar = function() {
		$mdSidenav('left').open();
	}

	$scope.closeSidebar = function() {
		$mdSidenav('left').close();
	}

	$scope.saveFooditem = function(fooditem) {
		if(fooditem) {
			fooditem.contact = contact;
			$scope.fooditems.push(fooditem);
			$scope.fooditem = {};
			$scope.closeSidebar();
			showToast("Food item saved!");
		}
	}

	$scope.editFooditem = function(fooditem) {
		$scope.editing = true;
		$scope.openSidebar();
		$scope.fooditem = fooditem;
	}

	$scope.saveEdit = function() {
		$scope.editing = false;
		$scope.fooditem = {};
		$scope.closeSidebar();
		showToast("Edit saved!");
	}

	$scope.deleteFooditem = function(event, fooditem) {
		var confirm = $mdDialog.confirm()
			.title(`Are you sure you want to delete ${fooditem.title}?`)
			.ok('Yes')
			.cancel('No')
			.targetEvent(event);
		$mdDialog.show(confirm).then(function() {
			var index = $scope.fooditems.indexOf(fooditem);
			$scope.fooditems.splice(index, 1);
		}, function() {
			
		});


	}

	function showToast(message) {
		$mdToast.show(
			$mdToast.simple()
				.content(message)
				.position('top, right')
				.hideDelay(3000)
		);
	}

	function getCategories(fooditems) {

		var categories = [];

		angular.forEach(fooditems, function(item) {
			angular.forEach(item.categories, function(category) {
				categories.push(category);
			});
		});

		return _.uniq(categories);
	}

});
