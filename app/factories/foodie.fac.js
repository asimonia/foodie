"use strict";

app.factory("foodieFactory", function($http) {

	function getFood() {
		return $http.get("data/food.json");
	}

	return {getFood}
});