'use strict';

/* jasmine specs for controllers go here */
describe('Product controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('productApp'));
  beforeEach(module('productServices'));

  describe('ProductListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://responsive.hybris.com:9001/rest/v1/apparel-uk/products?pageSize=20&productId=products').
          respond({"products":[{name: 'Shirt'}, {name: 'Hat'}]});

      scope = $rootScope.$new();
      ctrl = $controller('ProductListCtrl', {$scope: scope});
    }));


    it('should create "data" model with 2 data fetched from xhr', function() {
      expect(scope.searchResults.products).toBeUndefined();
      $httpBackend.flush();

      expect(scope.searchResults).toEqualData(
          {"products":[{name: 'Shirt'}, {name: 'Hat'}]});
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('name');
    });
  });

/*
  describe('PhoneDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
        xyzPhoneData = function() {
          return {
            name: 'phone xyz',
                images: ['image/url1.png', 'image/url2.png']
          }
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('data/xyz.json').respond(xyzPhoneData());

      $routeParams.phoneId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
    }));


    it('should fetch phone detail', function() {
      expect(scope.phone).toEqualData({});
      $httpBackend.flush();

      expect(scope.phone).toEqualData(xyzPhoneData());
    });
  });*/
});
