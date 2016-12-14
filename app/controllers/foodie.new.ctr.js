"use strict";

app.controller("newFoodieCtrl", function($scope, $state, $mdSidenav, $timeout, $mdDialog, foodieFactory) {

	var vm = this;
	vm.closeSidebar = closeSidebar;

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

});