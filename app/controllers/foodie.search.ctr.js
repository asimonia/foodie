 "use strict";

app.controller("searchFoodieCtrl", function($scope, $state, $mdSidenav, $timeout, $mdDialog, $mdToast, foodieFactory) {

	var vm = this;
	vm.searchRecipe = searchRecipe;
	vm.closeSidebar = closeSidebar;
	vm.logRecipe = logRecipe;
	vm.addRecipe = addRecipe;
	vm.saveRecipe = saveRecipe;
	vm.recipes;

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

	function logRecipe(recipe) {
		console.log(recipe);
	}

	function searchRecipe(recipe) {

		if(recipe) {
			console.log("You searched for", recipe);
			foodieFactory.searchRecipes(recipe).then(function(data) {
				vm.recipes = data.data.results;
				console.log("recipes: ", vm.recipes);
			});
		}
	}

	function addRecipe(recipe) {
		console.log("recipes: ", vm.recipes);
		// delete recipe from the list
		var index = vm.recipes.indexOf(recipe);
		vm.recipes.splice(index, 1);
		showToast('Recipe added!');
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