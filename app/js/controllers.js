'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', []);

productControllers.controller('ProductListCtrl', ['$scope', 'products',
  function($scope, products) {
    $scope.searchResult = products;
    $scope.orderProp = 'name';
  }]);

