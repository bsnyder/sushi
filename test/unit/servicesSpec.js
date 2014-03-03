'use strict';

/* jasmine specs for services go here */
describe('Product services: ', function() {

    beforeEach(function() {
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('productApp'));
    beforeEach(module('productServices'));

    describe('MultiProductLoader', function() {
        var mockBackend, loader;

        beforeEach(inject(function(_$httpBackend_, ProductSvc, MultiProductLoader) {
            mockBackend = _$httpBackend_;
            loader = MultiProductLoader;
        }));

        it('should load list of products', function() {
            mockBackend.expectGET('http://responsive.hybris.com:9001/rest/v1/apparel-uk/products?pageSize=3').respond({"products":[{name: 'Shirt'}, {name: 'Hat'}]});

            var products;

            var promise = loader();
            promise.then(function(prod) {
                products = prod;
            });

            expect(products).toBeUndefined();

            mockBackend.flush();

            expect(products).toEqualData({"products":[{name: 'Shirt'}, {name: 'Hat'}]});
        });
    });
});