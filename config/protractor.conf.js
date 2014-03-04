exports.config = {

	specs: [
		'./../test/e2e/*.spec.js'
	],

// TODO: get phantomjs workinggit 
	capabilities: {
		'browserName': 'phantomjs'
	},

	baseUrl: 'http://localhost:8000'

};