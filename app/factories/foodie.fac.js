"use strict";

app.factory("foodieFactory", function($http, $firebaseArray) {

	var ref = new Firebase('https://foodie-93ebe.firebaseio.com');

	function searchRecipes(recipe) {
		var req = {
			method: 'GET',
			url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?limitLicense=false&number=50&query=${recipe}`,
			headers: {
				'X-Mashape-Key': 'nmoNt3lCutmshYKKFhkeQIjiTlrjp1qroMvjsn6U9iOpe59As4'
		 	}
		}

		return $http(req);
	}

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

	return {
		ref: $firebaseArray(ref),
		searchRecipes,
		searchProducts
	};
});