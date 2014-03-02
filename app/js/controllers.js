'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', []);

productControllers.controller('ProductListCtrl', ['$scope', 'products', 'ProductSvc',
  function($scope, products, ProductSvc) {
    $scope.searchResult = products;
    $scope.orderProp = 'name';

    $scope.change = function() {
        if ($scope.query.length > 1) {
            $scope.searchResult = ProductSvc.query({query: $scope.query});
        }
    };
  }]);

