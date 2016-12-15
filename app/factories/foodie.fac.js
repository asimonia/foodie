"use strict";

app.factory("foodieFactory", function($http, $firebaseArray) {

	var ref = new Firebase('https://foodie-93ebe.firebaseio.com');

	function searchRecipes(recipe) {
		var req = {
			method: 'GET',
			url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?limitLicense=false&minProtein=0&number=50&offset=0&query=${recipe}&ranking=1`,
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