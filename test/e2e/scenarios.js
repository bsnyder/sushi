'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Sushi App', function() {

  it('should redirect index.html to index.html#/data', function() {
    browser().navigateTo('app/index.html');
    // what does this do?
    // expect(browser().location().url()).toBe('/data');
  });


  describe('Phone list view', function() {

    beforeEach(function() {
      browser().navigateTo('app/index.html#/data');
    });


    it('should filter the phone list as user types into the search box', function() {
      expect(repeater('li.media').count()).toBe(3);

      input('query').enter('monkeywrench');
      expect(repeater('li.media').count()).toBe(2);

      input('query').enter('Flower');
      input('pageSize').enter('100')
      expect(repeater('li.media').count()).toBe(9);
    });


    // it('should be possible to control product order via the drop down select box', function() {
    //   input('query').enter('snowboard'); //let's narrow the dataset to make the test assertions shorter

    //   expect(repeater('li.media', 'Phone List').column('phone.name')).
    //       toEqual(["Motorola XOOM\u2122 with Wi-Fi",
    //                "MOTOROLA XOOM\u2122"]);

    //   select('orderProp').option('Alphabetical');

    //   expect(repeater('.data li', 'Phone List').column('phone.name')).
    //       toEqual(["MOTOROLA XOOM\u2122",
    //                "Motorola XOOM\u2122 with Wi-Fi"]);
    // });


  //   it('should render phone specific links', function() {
  //     input('query').enter('nexus');
  //     element('.data li a').click();
  //     expect(browser().location().url()).toBe('/data/nexus-s');
  //   });
  // });


  // describe('Phone detail view', function() {

  //   beforeEach(function() {
  //     browser().navigateTo('app/index.html#/data/nexus-s');
  //   });


  //   it('should display nexus-s page', function() {
  //     expect(binding('phone.name')).toBe('Nexus S');
  //   });


  //   it('should display the first phone image as the main phone image', function() {
  //     expect(element('img.phone').attr('src')).toBe('img/data/nexus-s.0.jpg');
  //   });


  //   it('should swap main image if a thumbnail image is clicked on', function() {
  //     element('.phone-thumbs li:nth-child(3) img').click();
  //     expect(element('img.phone').attr('src')).toBe('img/data/nexus-s.2.jpg');

  //     element('.phone-thumbs li:nth-child(1) img').click();
  //     expect(element('img.phone').attr('src')).toBe('img/data/nexus-s.0.jpg');
  //   });
  });
});
