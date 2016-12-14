"use strict";

app.controller("newFoodieCtrl", function($mdSidenav, $timeout, $mdDialog, foodieFactory) {

	var vm = this;

	$timeout(function() {
		$mdSidenav('left').open();	
	});

});