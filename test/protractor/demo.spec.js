describe("product page", function () {

	beforeEach(function () {
		browser.get('app/index.html#');
	});

	describe("verify page", function () {
		it("should display correct title", function () {
			expect(browser.getTitle()).toBe('Sushi Storefront');
		});
	    
	    it('should filter the phone list as user types into the search box', function() {
      		var productList = element.all(by.css('li.media'));
      		var searchBox = element(by.model('searchModel'))
      		var pageSize = element(by.model('pageSize'))


      		// check default product count
      		expect(productList.count()).toBe(3);

      		//verify search
      		searchBox.sendKeys('monkeywrench');
      		expect(productList.count()).toBe(2);

      		//verify pagesize
      		searchBox.clear();
      		pageSize.clear();
      		searchBox.sendKeys("Flower");
      		pageSize.sendKeys("100");
      		expect(productList.count()).toBe(9);
      		// pause();
    	});
	});	
}); 