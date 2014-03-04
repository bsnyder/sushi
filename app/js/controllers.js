'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', []);

productControllers.controller('ProductListCtrl', ['$scope', 'products', 'MultiProductLoader',
    function ($scope, products, MultiProductLoader) {
        $scope.searchResult = products;

        // default values
        $scope.orderProp = 'name';
        $scope.pageSize = '3';

        function searchProducts(searchModel, pageSize, currentPage) {
            MultiProductLoader.query({query: searchModel, pageSize: pageSize, currentPage: currentPage}).then(
                function(products){
                    $scope.searchResult = products;
                });
        }
        // on change event of search input
        $scope.searchChange = function (searchModel, pageSize) {
            if (searchModel.length > 1) {
                searchProducts(searchModel, pageSize, 0);
            }
        };

        // on change event of page size input
        $scope.pageSizeChange = function (searchModel, pageSize) {
            if ($scope.pageSize.length > 0) {
               searchProducts(searchModel, pageSize, 0);
            }
        };

        // pagination
        $scope.setPage = function (searchModel, pageSize, pageNo) {
            searchProducts(searchModel, pageSize, pageNo-1);
        };
    }]);

productControllers.controller('ProductDetailCtrl', ['$scope', '$routeParams', 'MultiProductLoader',
    function ($scope, $routeParams, MultiProductLoader) {
        MultiProductLoader.query({query: $scope.searchModel, code: $routeParams.code,
            options: 'DESCRIPTION,GALLERY,VARIANT_FULL,PRICE,STOCK,CATEGORIES'}).then(
            function(product){
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
            });
    }]);
