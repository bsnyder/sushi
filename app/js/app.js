'use strict';

/* App Module */

var productApp = angular.module('productApp', [
  'ngRoute',
  'ui.bootstrap',
  'productControllers',
  'productFilters',
  'productServices'
]);

productApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/product-list.html',
        controller: 'ProductListCtrl',
        resolve: {
            products: ["MultiProductLoader", function(MultiProductLoader) {
                return MultiProductLoader();
            }]
        }
      }).
        when('/view/:code', {
            templateUrl: 'partials/product-detail.html',
            controller: 'ProductDetailCtrl'
        });/*.
      otherwise({
        redirectTo: '/'
      });
      */
  }]);
