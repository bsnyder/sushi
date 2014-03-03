'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', []);

productControllers.controller('ProductListCtrl', ['$scope', 'products', 'ProductSvc',
    function ($scope, products, ProductSvc) {
        $scope.searchResult = products;

        // default values
        $scope.orderProp = 'name';
        $scope.pageSize = '3';

        // on change event of search input
        $scope.searchChange = function () {
            if ($scope.query.length > 1) {
                $scope.searchResult = ProductSvc.query({query: $scope.query, pageSize: $scope.pageSize, currentPage: 0});
            }
        };

        // on change event of page size input
        $scope.pageSizeChange = function () {
            if ($scope.pageSize.length > 0) {
                $scope.searchResult = ProductSvc.query({query: $scope.query, pageSize: $scope.pageSize, currentPage: 0});
            }
        };

        // pagination
        $scope.setPage = function (pageNo) {
            $scope.searchResult = ProductSvc.query({query: $scope.query, pageSize: $scope.pageSize, currentPage: pageNo-1});
        };
    }]);

