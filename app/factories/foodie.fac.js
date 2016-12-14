"use strict";

app.factory("foodieFactory", function($http, $firebaseArray) {

	var ref = new Firebase('https://foodie-93ebe.firebaseio.com');

	return {
		ref: $firebaseArray(ref)
	};
});