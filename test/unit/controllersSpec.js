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

    describe('ProductListCtrl - basic GET on application load', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('http://responsive.hybris.com:9001/rest/v1/apparel-uk/products?pageSize=20&productId=products').
                respond({"products": [
                    {name: 'Shirt'},
                    {name: 'Hat'}
                ]});

            scope = $rootScope.$new();
            ctrl = $controller('ProductListCtrl', {$scope: scope});
        }));


        it('should create "data" model with 2 data fetched from xhr', function () {
            expect(scope.searchResults.products).toBeUndefined();
            $httpBackend.flush();

            expect(scope.searchResults).toEqualData(
                {"products": [
                    {name: 'Shirt'},
                    {name: 'Hat'}
                ]});
        });


        it('should set the default value of orderProp model', function () {
            expect(scope.orderProp).toBe('name');
        });

        it('should invoke search function on scope.getNewProductSearch()', function () {
            $httpBackend.flush(); // flush initial product load

            // actual thing we want to test
            $httpBackend.expectGET('http://responsive.hybris.com:9001/rest/v1/apparel-uk/products?pageSize=20&productId=products&query=foo').
                respond({"products": [
                    {name: 'Shirt'},
                    {name: 'Hat'}
                ]});
            scope.searchModel = 'foo';
            scope.getNewProductSearch();
            $httpBackend.flush();
            expect(scope.searchResults).toEqualData(
                {"products": [
                    {name: 'Shirt'},
                    {name: 'Hat'}
                ]});
        });

    });



});
