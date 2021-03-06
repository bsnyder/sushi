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
        .state('product-comparison', {
            url: '/compare/l/:prod1/r/:prod2',
            templateUrl: 'partials/product-comparison.html',
            controller: 'ProductComparisonCtrl'
        })
})
