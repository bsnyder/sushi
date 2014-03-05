'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', []);

productControllers.controller('ProductListCtrl', ['$scope', '$stateParams', '$location', 'MultiProductLoader',
    function ($scope, $stateParams, $location, MultiProductLoader) {

        // default values
        $scope.searchModel = $stateParams.searchModel;
        $scope.pageSize = ($stateParams.pageSize || 3);
        $scope.currentPage = ($stateParams.currentPage || 0);

        $scope.orderProp = 'name';

        searchProducts($scope.searchModel, $scope.pageSize, $scope.currentPage);

        // on change event of search input
        $scope.searchChange = function (searchModel, pageSize) {
            if (searchModel.length > 1) {
                $location.search({ searchModel: searchModel, pageSize: pageSize, currentPage: 0});
                searchProducts(searchModel, pageSize, 0);
            }
        };

        // on change event of page size input
        $scope.pageSizeChange = function (searchModel, pageSize) {
            if ($scope.pageSize.length > 0) {
               $location.search({ searchModel: searchModel, pageSize: pageSize, currentPage: 0});
               searchProducts(searchModel, pageSize, 0);
            }
        };

        // pagination
        $scope.setPage = function (searchModel, pageSize, pageNo) {
            $location.search({ searchModel: searchModel, pageSize: pageSize, currentPage: pageNo});
            searchProducts(searchModel, pageSize, pageNo-1);
        };

        function searchProducts(searchModel, pageSize, currentPage) {
            MultiProductLoader.query({query: searchModel, pageSize: pageSize, currentPage: currentPage}).then(
                function(products){
                    $scope.searchResult = products;
                });
        }
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
