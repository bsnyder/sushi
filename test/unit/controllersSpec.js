'use strict';

/* jasmine specs for controllers go here */
describe('Product controllers: ', function () {

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
        var scope, ctrl, $httpBackend, products;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, ProductSvc) {
            $httpBackend = _$httpBackend_;

            scope = $rootScope.$new();

            ctrl = $controller('ProductListCtrl', {
                $scope: scope,
                products: {"products":[{name: 'Shirt'}, {name: 'Hat'}]}});
        }));

        it('should have an initial list of products', function() {
            expect(scope.searchResult).toEqualData({"products":[{name: 'Shirt'}, {name: 'Hat'}]});
        });

        it('should set the default value of orderProp model', function () {
            expect(scope.orderProp).toBe('name');
        });

        it('should set the default value of pageSize model', function () {
            expect(scope.pageSize).toBe('3');
        });

        it('should invoke search function on scope.searchChange()', function () {

            // actual thing we want to test
            $httpBackend.expectGET('http://responsive.hybris.com:9001/rest/v1/apparel-uk/products?currentPage=0&pageSize=5&query=foo').
                respond({"products": [
                    {name: 'Shirt'},
                    {name: 'Hat'}
                ]});

            scope.searchChange('foo', 5);

            $httpBackend.flush();
            expect(scope.searchResult).toEqualData(
                {"products": [
                    {name: 'Shirt'},
                    {name: 'Hat'}
                ]});
        });

        it('should invoke search function on scope.pageSizeChange()', function () {

            // actual thing we want to test
            $httpBackend.expectGET('http://responsive.hybris.com:9001/rest/v1/apparel-uk/products?currentPage=0&pageSize=5&query=foo').
                respond({"products": [
                    {name: 'Shirt'},
                    {name: 'Hat'}
                ]});

            scope.pageSizeChange('foo', 5);

            $httpBackend.flush();
            expect(scope.searchResult).toEqualData(
                {"products": [
                    {name: 'Shirt'},
                    {name: 'Hat'}
                ]});
        });

        it('should invoke search function on scope.setPage()', function () {

            // actual thing we want to test
            $httpBackend.expectGET('http://responsive.hybris.com:9001/rest/v1/apparel-uk/products?currentPage=1&pageSize=5&query=foo').
                respond({"products": [
                    {name: 'Shirt'},
                    {name: 'Hat'}
                ]});

            scope.setPage('foo', 5, 2);

            $httpBackend.flush();
            expect(scope.searchResult).toEqualData(
                {"products": [
                    {name: 'Shirt'},
                    {name: 'Hat'}
                ]});
        });

    });
});
