"use strict";

app.controller("editFoodieCtrl", function($scope, $state, $mdSidenav, $timeout, $mdDialog, foodieFactory) {

	var vm = this;
	vm.closeSidebar = closeSidebar;
	vm.saveEdit = saveEdit;
	vm.fooditem = $state.params.fooditem;

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

	function saveEdit(fooditem) {
		$scope.$emit("editSaved", "Edit saved!");
		vm.sidenavOpen = false;
	}

});