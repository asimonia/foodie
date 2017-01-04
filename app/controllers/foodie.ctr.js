"use strict";

app.controller("foodieCtrl", function($scope, $state, $http, foodieFactory, $mdSidenav, $mdToast, $mdDialog) {

	var vm = this;

	vm.categories;
	vm.currentRecipe;
	vm.searchRecipes = searchRecipes;
	vm.searchProducts = searchProducts;
	vm.searchFridge = searchFridge;
	vm.openSidebar = openSidebar;
	vm.closeSidebar = closeSidebar;
	vm.saveFooditem = saveFooditem;
	vm.editFooditem = editFooditem;
	vm.deleteFooditem = deleteFooditem;
	vm.saveEdit = saveEdit;
	vm.getInstructions = getInstructions;
	vm.totalCalories = 0;
	vm.totalFat = 0;
	vm.totalCarbs = 0;
	vm.totalProtein = 0;

	vm.fooditems = foodieFactory.ref;
	vm.fooditems.$loaded().then(getCalories);

	$scope.$on('newFooditem', function(event, fooditem) {
		vm.fooditems.$add(fooditem);
		var pop = new Audio("../data/pop.ogg");
		pop.play();
		showToast(`${fooditem.title} Saved!`);
		getCalories(vm.fooditems);
	});

	$scope.$on('editSaved', function(event, message) {
		showToast(message);
		getCalories(vm.fooditems);
	});

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

	function getInstructions(event, fooditem) {
		vm.currentRecipe = fooditem;
		console.log(fooditem);
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'templates/dialog1.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: event,
	      clickOutsideToClose:true,
	      fullscreen: false,
	      locals: {
	      	items: vm.currentRecipe
	      } 
	    })
	    .then(function(answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
		
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
		getCalories(vm.fooditems);
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
		getCalories(vm.fooditems);
	}

	function deleteFooditem(event, fooditem) {
		var confirm = $mdDialog.confirm()
			.title(`Are you sure you want to delete ${fooditem.title}?`)
			.ok('Yes')
			.cancel('No')
			.targetEvent(event);
		$mdDialog.show(confirm).then(function() {
			var pop = new Audio("../data/pop.ogg");
			pop.play();
			vm.fooditems.$remove(fooditem);
			showToast(`${fooditem.title} Deleted!`);
		}, function() {
			
		});
		getCalories(vm.fooditems);
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

	function getCalories(fooditems) {

		// reset calorie count
		vm.totalCalories = 0;
		vm.totalFat = 0;
		vm.totalCarbs = 0;
		vm.totalProtein = 0;
		console.log("fooditems reset!", fooditems)

		angular.forEach(fooditems, function(item) {
			if (item.calories) {
				console.log(fooditems);
				vm.totalCalories += parseInt(item.calories);
				vm.totalFat += parseInt(item.fat);
				vm.totalProtein += parseInt(item.protein);
				vm.totalCarbs += parseInt(item.carbs);
				console.log("totalCalories", vm.totalCalories);
			}
		});
	}

	  function DialogController($scope, $mdDialog, items, foodieFactory) {

	  	$scope.items = items;

	  	$scope.showRecipe = function (r) {

			if (r) {
				console.log("You searched for", r);
				foodieFactory.searchInstructions(r).then(function(data) {
					$scope.instructions = data.data[0].steps;
					$scope.ingredients = data.data[0].steps;
					console.log("instructions: ", $scope.instructions);
				});
			}
		}

	    $scope.hide = function() {
	      $mdDialog.hide();
	      console.log(vm.currentRecipe);
	    };

	    $scope.cancel = function() {
	      $mdDialog.cancel();
	      console.log(vm.currentRecipe);
	    };

	    $scope.answer = function(answer) {
	      $mdDialog.hide(answer);
	      console.log(vm.currentRecipe);
	    };
	  }

});
