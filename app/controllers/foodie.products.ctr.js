 "use strict";

app.controller("productsFoodieCtrl", function($scope, $state, $mdSidenav, $timeout, $mdDialog, foodieFactory) {

	var vm = this;
	vm.searchProduct = searchProduct;
	vm.closeSidebar = closeSidebar;
	vm.saveProduct = saveProduct;
	vm.products;

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

	function searchProduct(product) {

		if (product) {
			console.log("You searched for", product);
			foodieFactory.searchProducts(product).then(function(data) {
				vm.products = data.data;
				console.log("product: ", vm.products);
			});
		}
	}

	function saveProduct(product) {
		console.log("save product", product);
		if (product) {

			$scope.$emit('newFooditem', product);
			vm.sidenavOpen = false;
		}
	}


});