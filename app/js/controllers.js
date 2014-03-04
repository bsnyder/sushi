'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', []);

productControllers.controller('ProductListCtrl', ['$scope', 'products', 'ProductSvc',
  function($scope, products, ProductSvc) {
    $scope.searchResults = products;
    $scope.orderProp = 'name';

    $scope.getNewProductSearch = function() {
        if ($scope.searchModel.length > 1) {
            $scope.searchResults = ProductSvc.query ({query: $scope.searchModel});
        }
    };
  }]);

