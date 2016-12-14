 "use strict";

app.controller("searchFoodieCtrl", function($scope, $state, $mdSidenav, $timeout, $mdDialog, foodieFactory) {

	var vm = this;
	vm.searchRecipe = searchRecipe;
	vm.closeSidebar = closeSidebar;
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

	function searchRecipe(recipe) {

		if(recipe) {
			console.log("You searched for", recipe);
			foodieFactory.searchRecipes(recipe).then(function(data) {
				vm.recipes = data.data;
				console.log("recipes: ", vm.recipes);
			});
		}
	}

	function saveRecipe(recipe) {

	/*
		if(fooditem) {

			fooditem.contact = {
				name: "Alex Simonian",
				phone: "(555) 555-5555",
				email: "alex.simonian@gmail.com"
			};

			$scope.$emit('newFooditem', fooditem);
			vm.sidenavOpen = false;
		}
	*/
	}

});