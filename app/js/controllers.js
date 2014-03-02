'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', []);

productControllers.controller('ProductListCtrl', ['$scope', 'products', 'ProductSvc',
  function($scope, products, ProductSvc) {
    $scope.searchResult = products;
    $scope.orderProp = 'name';

    $scope.searchChange = function() {
        if ($scope.query.length > 1) {
            $scope.searchResult = ProductSvc.query({query: $scope.query, pageSize: $scope.pageSize});
        }
    };

      $scope.pageSizeChange = function() {
          if ($scope.pageSize.length > 0) {
              $scope.searchResult = ProductSvc.query({query: $scope.query, pageSize: $scope.pageSize});
          }
      };
  }]);

