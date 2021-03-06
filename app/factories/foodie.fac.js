"use strict";

app.factory("foodieFactory", function($http, $firebaseArray) {

	var ref = new Firebase('https://foodie-93ebe.firebaseio.com');

	// Complex Recipe Search
	function searchRecipes(recipe) {
		var req = {
			method: 'GET',
			url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?limitLicense=false&minProtein=0&number=50&offset=0&query=${recipe.name}&ranking=1&cuisine=${recipe.cuisine}&type=${recipe.type}`,
			headers: {
				'X-Mashape-Key': 'nmoNt3lCutmshYKKFhkeQIjiTlrjp1qroMvjsn6U9iOpe59As4'
		 	}
		}

		return $http(req);
	}

	// Search Grocery Products
	function searchProducts(product) {
		var req = {
			method: 'GET',
			url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/search?number=25&query=${product}`,
			headers: {
				'X-Mashape-Key': 'nmoNt3lCutmshYKKFhkeQIjiTlrjp1qroMvjsn6U9iOpe59As4'
		 	}
		}

		return $http(req);
	}

	// Find By Ingredients
	function searchFridge(ingredients) {
		
		var req = {
			method: 'GET',
			url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredients}&limitLicense=false&number=5&ranking=1`,
			headers: {
				'X-Mashape-Key': 'nmoNt3lCutmshYKKFhkeQIjiTlrjp1qroMvjsn6U9iOpe59As4'
		 	}
		}
		return $http(req);
	}

	// Get Analyzed Recipe Instructions
	function searchInstructions(id) {

		var req = {
			method: 'GET',
			url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/analyzedInstructions?stepBreakdown=true`,
			headers: {
				'X-Mashape-Key': 'nmoNt3lCutmshYKKFhkeQIjiTlrjp1qroMvjsn6U9iOpe59As4'
		 	}	
		}
		return $http(req);
	}

	return {
		ref: $firebaseArray(ref),
		searchRecipes,
		searchProducts,
		searchFridge,
		searchInstructions
	};
});