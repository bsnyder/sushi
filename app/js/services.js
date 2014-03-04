'use strict';

/* Services */

var productServices = angular.module('productServices', ['ngResource']);

productServices.factory('ProductSvc', ['$resource',
    function($resource){
        return $resource('http://responsive.hybris.com:9001/rest/v1/apparel-uk/products/:code', {code: '@code',
            pageSize: 3}, {
            query: {method:'GET', isArray:false}
        });
    }]);

productServices.factory('MultiProductLoader', ['ProductSvc', '$q',
    function(ProductSvc, $q) {
        return {
            query: function(params) {
                var delay = $q.defer();
                ProductSvc.query(params, function(products) {
                    delay.resolve(products);
                }, function() {
                    delay.reject('Unable to fetch products');
                });
                return delay.promise;
             }
        };
    }]);