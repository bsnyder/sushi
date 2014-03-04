exports.config = {

	specs: [
		'./../test/protractor/*.spec.js'
	],

	capabilities: {
		'browserName': 'phantomjs'
	},

	baseUrl: 'http://localhost:8000'

};