describe("product page", function () {

	beforeEach(function () {
		browser.get('app/index.html#');
	});

	describe("verify page", function () {

		    var productCount = element.all(by.css('li.media'));
		    var productList = element(by.css('li.media'));
      		var searchBox = element(by.model('searchModel'));
      		var pageSize = element(by.model('pageSize'));



		it("should display correct title", function () {
			expect(browser.getTitle()).toBe('Sushi Storefront');
		});
	    
	    it('should filter the product list as user types into the search box', function() {

      		// check default product count
      		expect(productCount.count()).toBe(3);

      		//verify search
      		searchBox.sendKeys('monkeywrench');
      		expect(productCount.count()).toBe(2);

      		//verify pagesize
      		searchBox.clear();
      		pageSize.clear();
      		searchBox.sendKeys("Flower");
      		pageSize.sendKeys("100");
      		expect(productCount.count()).toBe(9);
    	});

	    it('should be able to filter on alphabet and price', function () {
	    	//test default
	    	searchBox.clear();
	    	searchBox.sendKeys("snowboard");
    		expect(productList.getText()).toEqual("Snowboard Ski Tool Red FBI 6\n\u00A316.96");
	    });

	});	
}); 

