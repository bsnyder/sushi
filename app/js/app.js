'use strict';

/* App Module */

var productApp = angular.module('productApp', [
  'ngRoute',
  'productControllers',
  'productFilters',
  'productServices'
]);

productApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/data', {
        templateUrl: 'partials/product-list.html',
            controller: 'ProductListCtrl',
            resolve: {
                products: ["MultiProductLoader", function(MultiProductLoader) {
                    return MultiProductLoader();
                }]
            }
        }).
      otherwise({
        redirectTo: '/data'
      });
  }]);
