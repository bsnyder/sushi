exports.config = {

	specs: [
		'./../test/protractor/*.spec.js'
	],

	capabilities: {
		// 'browserName': 'phantomjs'
		'browserName': 'chrome'
	},

	baseUrl: 'http://localhost:8000'

};