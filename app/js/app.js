'use strict';

/* App Module */

var productApp = angular.module('productApp', [
  'ngRoute',
  'ui.bootstrap',
  'ui.router',
  'productControllers',
  'productFilters',
  'productServices'
]);

productApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: '/?searchModel&pageSize&currentPage',
            templateUrl: 'partials/product-list.html',
            controller: 'ProductListCtrl',
            reloadOnSearch: false
        })
        .state('view', {
            url: '/view/:code',
            templateUrl: 'partials/product-detail.html',
            controller: 'ProductDetailCtrl'
        })
})