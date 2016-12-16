 "use strict";

app.controller("searchFoodieCtrl", function($scope, $state, $mdSidenav, $timeout, $mdDialog, $mdToast, foodieFactory) {

	var vm = this;
	vm.searchRecipe = searchRecipe;
	vm.closeSidebar = closeSidebar;
	vm.saveRecipe = saveRecipe;
	vm.recipes;
	vm.cuisines = ['african', 'chinese', 'japanese', 'korean', 'vietnamese', 'thai', 'indian', 'british', 'irish', 'french', 'italian', 'mexican', 'spanish', 'middle eastern', 'jewish', 'american', 'cajun', 'southern', 'greek', 'german', 'nordic', 'eastern european', 'caribbean', 'latin american'];
	vm.types = ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'drink'];

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
				vm.recipes = data.data.results;
				console.log("recipes: ", vm.recipes);
			});
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