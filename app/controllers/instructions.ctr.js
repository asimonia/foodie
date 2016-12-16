"use strict";

app.controller("instructionsCtrl", function($state, foodieFactory) {

	var vm = this;

	vm.goFooditems = goFooditems;
	vm.searchInstructions = searchInstructions;

	vm.instructions;
	vm.ingredients;

	function goFooditems() {
		$state.go('fooditems');
	}

	function searchInstructions(id) {

		if (id) {
			console.log("You searched for", id);
			foodieFactory.searchInstructions(id).then(function(data) {
				vm.instructions = data.data[0].steps;
				vm.ingredients = data.data[0].steps;
				console.log("instructions: ", vm.instructions);
			});
		}
	}

});