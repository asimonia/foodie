"use strict";

app.controller("foodieCtrl", function($scope, $http, foodieFactory, $mdSidenav, $mdToast) {

	foodieFactory.getFood().then(function(fooditems) {
		$scope.fooditems = fooditems.data;
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
			fooditem.contact = contact
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

	function showToast(message) {
		$mdToast.show(
			$mdToast.simple()
				.content(message)
				.position('top, right')
				.hideDelay(3000)
		);
	}
});
