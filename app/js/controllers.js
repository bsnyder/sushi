'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', []);

productControllers.controller('ProductListCtrl', ['$scope', 'products', 'MultiProductLoader',
    function ($scope, products, MultiProductLoader) {
        $scope.searchResult = products;

        // default values
        $scope.orderProp = 'name';
        $scope.pageSize = '3';

        function searchProducts(currentPage) {
            MultiProductLoader.query({query: $scope.searchModel, pageSize: $scope.pageSize, currentPage: currentPage}).then(
                function(products){
                    $scope.searchResult = products;
                });
        }
        // on change event of search input
        $scope.searchChange = function () {
            if ($scope.searchModel.length > 1) {
                searchProducts(0);
            }
        };

        // on change event of page size input
        $scope.pageSizeChange = function () {
            if ($scope.pageSize.length > 0) {
               searchProducts(0);
            }
        };

        // pagination
        $scope.setPage = function (pageNo) {
            searchProducts(pageNo-1);
        };
    }]);

productControllers.controller('ProductDetailCtrl', ['$scope', '$stateParams', 'MultiProductLoader',
    function ($scope, $stateParams, MultiProductLoader) {

        MultiProductLoader.query({
                query: $scope.searchModel,
                code: $stateParams.code,
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
