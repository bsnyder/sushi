'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', []);

productControllers.controller('ProductListCtrl', ['$scope', 'ProductSvc',
  function($scope, ProductSvc) {
    $scope.searchResult = ProductSvc.query();
    $scope.orderProp = 'name';
  }]);

