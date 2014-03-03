'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', []);

productControllers.controller('ProductListCtrl', ['$scope', 'ProductSvc',
  function($scope, ProductSvc) {
    $scope.searchResults = ProductSvc.query();
    $scope.orderProp = 'name';
  }]);

