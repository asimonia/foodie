"use strict";

app.controller("fridgifyFoodieCtrl", function($scope, $state, $mdSidenav, $timeout, $mdDialog, $mdToast, foodieFactory) {

	var vm = this;
	vm.searchFridge = searchFridge;
	vm.closeSidebar = closeSidebar;
	vm.saveRecipe = saveRecipe;
	vm.doSomething = doSomething;
	vm.addItem = addItem;
	vm.removeItem = removeItem;
	vm.ingredients;
	vm.recipes;

	vm.ingredients = [];

	function addItem(ingredient) {
		if (ingredient) {
			vm.ingredients.push(ingredient);
			console.log("ingredients: ", vm.ingredients);
		}
	}

	function removeItem(x) {
		vm.ingredients.splice(x, 1);
	}

	function doSomething(ingredient) {
		alert(ingredient);
	}

	$timeout(function() {
		$mdSidenav('left').open();	
	});

	$scope.$watch('vm.sidenavOpen', function(sidenav) {
		if(sidenav === false) {
			$mdSidenav('left')
				.close()
				.then(function() {
					$state.go('fooditems');
				});
		}
	});

	function closeSidebar() {
		vm.sidenavOpen = false;
	}

	function searchFridge(ingredients) {

		if(ingredients) {
			ingredients = ingredients.join(",");
			console.log("You searched for", ingredients);
			foodieFactory.searchFridge(ingredients).then(function(data) {
				vm.recipes = data.data;
				console.log("recipes: ", vm.recipes);
			});
			vm.ingredients = [];
		}
	}

	function showToast(message) {
		$mdToast.show(
			$mdToast.simple()
				.content(message)
				.position('top, right')
				.hideDelay(3000)
		);
	}

	function saveRecipe(recipe) {
		console.log("save recipe", recipe);
		if(recipe) {

			$scope.$emit('newFooditem', recipe);
			vm.sidenavOpen = false;
		}
	}

});