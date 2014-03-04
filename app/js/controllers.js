'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', []);

productControllers.controller('ProductListCtrl', ['$scope', 'products', 'MultiProductLoader',
    function ($scope, products, MultiProductLoader) {
        $scope.searchResult = products;

        // default values
        $scope.orderProp = 'name';
        $scope.pageSize = '3';

        // on change event of search input
        $scope.searchChange = function () {
            if ($scope.searchModel.length > 1) {
               MultiProductLoader.query({query: $scope.searchModel, pageSize: $scope.pageSize, currentPage: 0}).then(
                   function(products){
                        $scope.searchResult = products;
               });
            }
        };

        // on change event of page size input
        $scope.pageSizeChange = function () {
            if ($scope.pageSize.length > 0) {
                $scope.searchResult = MultiProductLoader.query({query: $scope.searchModel, pageSize: $scope.pageSize, currentPage: 0}).then(
                    function(products){
                        $scope.searchResult = products;
                    });
            }
        };

        // pagination
        $scope.setPage = function (pageNo) {
            $scope.searchResult = MultiProductLoader.query({query: $scope.searchModel, pageSize: $scope.pageSize, currentPage: pageNo-1}).then(
                function(products){
                    $scope.searchResult = products;
                });
        };
    }]);

productControllers.controller('ProductDetailCtrl', ['$scope', '$routeParams', 'ProductSvc',
    function ($scope, $routeParams, MultiProductLoader) {
        $scope.product = MultiProductLoader.query({query: $scope.searchModel, code: $routeParams.code, options: 'DESCRIPTION'});
    }]);

