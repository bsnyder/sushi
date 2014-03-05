'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', []);

productControllers.controller('ProductListCtrl', ['$scope', 'products', 'MultiProductLoader',
    function ($scope, products, MultiProductLoader) {
        $scope.searchResult = products;

        // default values
        $scope.orderProp = 'name';
        $scope.pageSize = '3';
        $scope.compareCount = 0;
        $scope.prod1 = '';
        $scope.prod2 = '';
        $scope.isCompareDisabled = function () {
            var disabled = this.compareCount === 2;
            console.log("is compare disabled: "+disabled);
            return disabled;
        }

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

        $scope.changeCompareCount = function(selected, productId) {
            $scope.compareCount += selected ? 1 : -1;
            if($scope.compareCount === 1) {
                $scope.prod1 = productId;
                $scope.prod2 = '';
            } else {
                $scope.prod2 = productId;
            }
            console.log('compare count is '+$scope.compareCount+'; product code is '+productId);
        }
    }]);

productControllers.controller('ProductDetailCtrl', ['$scope', '$stateParams', 'MultiProductLoader',
    function ($scope, $stateParams, MultiProductLoader) {

        MultiProductLoader.query({
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

productControllers.controller('ProductComparisonCtrl', ['$scope', '$stateParams', 'MultiProductLoader',
    function ($scope, $stateParams, MultiProductLoader) {
        MultiProductLoader.query({
            code: $stateParams.prod1,
            options: 'DESCRIPTION,GALLERY,VARIANT_FULL,PRICE,STOCK,CATEGORIES'}).then(

            function(product1){
                $scope.product1 = product1;
                /*
                 separate description and features (both are crammed in the same string in the response)
                 features will be an array of strings
                 */
                if (product1.description.indexOf("Features:") != -1) {
                    var stringArray = product1.description.split("Features:");
                    $scope.product1.description = stringArray[0];
                    $scope.product1.features = stringArray[1].split("+ ");
                    if ($scope.product1.features[0] === "") {
                        $scope.product.features.splice(0, 1);
                    }
                    if ($scope.product1.description === "") {
                        $scope.product1.description = "No description";
                    }
                }
            });
        MultiProductLoader.query({
            code: $stateParams.prod2,
            options: 'DESCRIPTION,GALLERY,VARIANT_FULL,PRICE,STOCK,CATEGORIES'}).then(

            function(product2){
                $scope.product2 = product2;
                /*
                 separate description and features (both are crammed in the same string in the response)
                 features will be an array of strings
                 */
                if (product2.description.indexOf("Features:") != -1) {
                    var stringArray = product.description.split("Features:");
                    $scope.product2.description = stringArray[0];
                    $scope.product2.features = stringArray[1].split("+ ");
                    if ($scope.product2.features[0] === "") {
                        $scope.product2.features.splice(0, 1);
                    }
                    if ($scope.product2.description === "") {
                        $scope.product2.description = "No description";
                    }
                }
            });
    }
]);
