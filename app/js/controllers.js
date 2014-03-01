'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', []);

productControllers.controller('ProductListCtrl', ['$scope', 'ProductSvc',
  function($scope, ProductSvc) {
    $scope.products = ProductSvc.query();
    $scope.orderProp = 'name';
  }]);

