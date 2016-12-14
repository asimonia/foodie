"use strict";

app.controller("foodieCtrl", function($scope, $state, $http, foodieFactory, $mdSidenav, $mdToast, $mdDialog) {

	var vm = this;

	vm.openSidebar = openSidebar;
	vm.closeSidebar = closeSidebar;
	vm.saveFooditem = saveFooditem;
	vm.editFooditem = editFooditem;
	vm.deleteFooditem = deleteFooditem;
	vm.saveEdit = saveEdit;

	vm.fooditems;
	vm.categories;

	foodieFactory.getFood().then(function(fooditems) {
		vm.fooditems = fooditems.data;
		vm.categories = getCategories(vm.fooditems);
	});

	$scope.$on('newFooditem', function(event, fooditem) {
		fooditem.id = vm.fooditems.length + 1;
		vm.fooditems.push(fooditem);
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
			id: fooditem.id,
			fooditem: fooditem
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
			var index = $scope.fooditems.indexOf(fooditem);
			vm.fooditems.splice(index, 1);
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
