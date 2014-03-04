exports.config = {

	specs: [
		'./../test/e2e/*.spec.js'
	],

// TODO: get phantomjs working
	// capabilities: {
	// 	'browserName': 'PhantomJS'
	// },

	baseUrl: 'http://localhost:8000'

};