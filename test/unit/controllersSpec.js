'use strict';

/* jasmine specs for controllers go here */
describe('Product controllers', function () {

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('productApp'));
    beforeEach(module('productServices'));

    describe('ProductListCtrl', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, ProductSvc) {
            $httpBackend = _$httpBackend_;

            scope = $rootScope.$new();

            ctrl = $controller('ProductListCtrl', {
                $scope: scope,
                products: {"products":[{name: 'Shirt'}, {name: 'Hat'}]}});
        }));

        it('should have an initial list of products injected through constructor', function() {
            expect(scope.searchResults).toEqualData({"products":[{name: 'Shirt'}, {name: 'Hat'}]});
        });


        it('should invoke search function on scope.getNewProductSearch()', function () {

            // actual thing we want to test
            $httpBackend.expectGET('http://responsive.hybris.com:9001/rest/v1/apparel-uk/products?pageSize=20&productId=products&query=foo').
                respond({"products": [
                    {name: 'Cap'},
                    {name: 'Scarf'}
                ]});
            scope.searchModel = 'foo';
            scope.getNewProductSearch();
            $httpBackend.flush();
            expect(scope.searchResults).toEqualData(
                {"products": [
                    {name: 'Cap'},
                    {name: 'Scarf'}
                ]});
        });

    });



});
