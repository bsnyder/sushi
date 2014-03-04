describe("hello protractor", function () {
	var ptor = protractor.getInstance();

	describe("index", function () {
		it("should display correct title", function () {
			ptor.get('app/index.html#');
			expect(ptor.getTitle()).toBe('Sushi Storefront');
		});
	});


}); 