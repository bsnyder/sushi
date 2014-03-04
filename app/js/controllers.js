'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', []);

productControllers.controller('ProductListCtrl', ['$scope', 'ProductSvc',
  function($scope, ProductSvc) {
    $scope.searchResults = ProductSvc.query();
    $scope.orderProp = 'name';

    $scope.getNewProductSearch = function() {
        if ($scope.searchModel.length > 1) {
            $scope.searchResults = ProductSvc.query ({query: $scope.searchModel});
        }
    };
  }]);

