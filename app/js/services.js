'use strict';

/* Services */

var productServices = angular.module('productServices', ['ngResource']);

productServices.factory('ProductSvc', ['$resource',
  function($resource){
    return $resource('data/:productId.json', {}, {
      query: {method:'GET', params:{productId:'products'}, isArray:true}
    });
  }]);
