"use strict";

app.controller("foodieCtrl", function($scope, $state, $http, foodieFactory, $mdSidenav, $mdToast, $mdDialog) {

	var vm = this;

	vm.categories;
	vm.searchRecipes = searchRecipes;
	vm.searchProducts = searchProducts;
	vm.searchFridge = searchFridge;
	vm.openSidebar = openSidebar;
	vm.closeSidebar = closeSidebar;
	vm.saveFooditem = saveFooditem;
	vm.editFooditem = editFooditem;
	vm.deleteFooditem = deleteFooditem;
	vm.saveEdit = saveEdit;

	vm.fooditems = foodieFactory.ref;
	vm.fooditems.$loaded().then(function(fooditems) {
		vm.categories = getCategories(fooditems);
	});

	$scope.$on('newFooditem', function(event, fooditem) {
		vm.fooditems.$add(fooditem);
		showToast('Food item saved!');
	});

	$scope.$on('editSaved', function(event, message) {
		showToast(message);
	});

	var contact = {
		name: "Alex Simonian",
		phone: "(555) 555-5555",
		email: "alex.simonian@gmail.com"
	};

	function openSidebar() {
		$state.go('fooditems.new');
	}

	function searchRecipes() {
		$state.go('fooditems.search');
	}

	function searchProducts() {
		$state.go('fooditems.products');
	}

	function searchFridge() {
		$state.go('fooditems.fridgify');
	}

	function closeSidebar() {
		$mdSidenav('left').close();
	}

	function saveFooditem(fooditem) {
		if(fooditem) {
			fooditem.contact = contact;
			vm.fooditems.push(fooditem);
			vm.fooditem = {};
			closeSidebar();
			showToast("Food item saved!");
		}
	}

	function editFooditem(fooditem) {
		$state.go('fooditems.edit', {
			id: fooditem.$id
		});
	}

	function saveEdit() {
		vm.editing = false;
		vm.fooditem = {};
		closeSidebar();
		showToast("Edit saved!");
	}

	function deleteFooditem(event, fooditem) {
		var confirm = $mdDialog.confirm()
			.title(`Are you sure you want to delete ${fooditem.title}?`)
			.ok('Yes')
			.cancel('No')
			.targetEvent(event);
		$mdDialog.show(confirm).then(function() {
			vm.fooditems.$remove(fooditem);
			showToast('Food item deleted!');
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
