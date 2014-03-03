'use strict';

/* Services */

var productServices = angular.module('productServices', ['ngResource']);

productServices.factory('ProductSvc', ['$resource',
    function($resource){
        return $resource('http://responsive.hybris.com:9001/rest/v1/apparel-uk/products', {pageSize:3}, {
            query: {method:'GET', isArray:false}
        });
    }]);

productServices.factory('MultiProductLoader', ['ProductSvc', '$q',
    function(ProductSvc, $q) {
        return function() {
            var delay = $q.defer();
            ProductSvc.query(function(products) {
                delay.resolve(products);
            }, function() {
                delay.reject('Unable to fetch products');
            });
            return delay.promise;
        };
    }]);