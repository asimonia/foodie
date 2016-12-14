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
			$mdToast.show(
				$mdToast.simple()
					.content(`${fooditem.title} saved!`)
					.position('top, right')
					.hideDelay(3000)
			);
		}
	}
});
