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
    function ($scope, $routeParams, ProductSvc) {
        ProductSvc.query({query: $scope.query, code: $routeParams.code}, function(product){
            console.log("success", product);
            $scope.product = product;
            /*
                separate description and features (both are crammed in the same string in the response)
                features will be an array of strings
             */
            if (product.description.indexOf("Features:") != -1) {
                var stringArray = product.description.split("Features:");
                $scope.product.description = stringArray[0];
                $scope.product.features = stringArray[1].split("+ ");
                if ($scope.product.features[0] === "") {
                    $scope.product.features.splice(0, 1);
                }
                if ($scope.product.description === "") {
                    $scope.product.description = "No description";
                }
            }
        }, function(error){
            console.log("request failed");
        });
    }]);

