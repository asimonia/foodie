"use strict";

var app = angular.module("foodie", ['ngMaterial', 'ui.router', 'firebase']);

app.config(function($mdThemingProvider, $stateProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('purple', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
    });

  $stateProvider
    .state('fooditems', {
      url: '/fooditems',
      templateUrl: 'templates/fooditems.html',
      controller: 'foodieCtrl as vm'
    })
    .state('fooditems.new', {
      url: '/new',
      templateUrl: 'templates/fooditems.new.html',
      controller: 'newFoodieCtrl as vm'
    })
    .state('fooditems.edit', {
      url: '/edit/:id',
      templateUrl: 'templates/fooditems.edit.html',
      controller: 'editFoodieCtrl as vm',
      params: {
        fooditem: null
      }
    })
    .state('fooditems.search', {
      url: '/search',
      templateUrl: 'templates/fooditems.search.html',
      controller: 'searchFoodieCtrl as vm'
    })
    .state('fooditems.products', {
      url: '/products',
      templateUrl: 'templates/fooditems.products.html',
      controller: 'productsFoodieCtrl as vm'
    });

});