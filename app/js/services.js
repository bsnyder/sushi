'use strict';

/* Services */

var productServices = angular.module('productServices', ['ngResource']);

productServices.factory('ProductSvc', ['$resource',
  function($resource){
      return $resource('http://responsive.hybris.com:9001/rest/v1/apparel-uk/products?pageSize=20', {}, {
          query: {method:'GET', params:{productId:'products'}, isArray:false}
    });
  }]);
