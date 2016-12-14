"use strict";

app.controller("editFoodieCtrl", function($scope, $state, $mdSidenav, $timeout, $mdDialog, foodieFactory) {

	var vm = this;
	vm.fooditems = foodieFactory.ref;
	vm.closeSidebar = closeSidebar;
	vm.saveEdit = saveEdit;
	vm.fooditem = vm.fooditems.$getRecord($state.params.id);

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
		vm.fooditems.$save(vm.fooditem).then(function() {
			$scope.$emit("editSaved", "Edit saved!");
			vm.sidenavOpen = false;			
		});
	}

});