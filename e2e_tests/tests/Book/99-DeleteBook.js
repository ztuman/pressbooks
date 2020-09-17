module.exports = {
	beforeEach: function (browser) {
		if (browser.globals.now !== undefined) {
			console.log('Signing in...');
			browser.globals.functionHelpers = require('../../helpers/functions.js');
			browser.globals.functionHelpers.loginAdminUser(browser);
		}
	},
	'Delete created book': function (browser) {
		browser
			.url(process.env.HOST_TEST + '/wp/wp-admin/network/sites.php')
			.waitForElementVisible('#site-search-input')
			.setValue('#site-search-input', 'e2etestbook')
			.click('#search-submit')
			.pause(2000)
			.waitForElementVisible('.has-row-actions')
			.click('#cb-select-all-1')
			.click('select[id="bulk-action-selector-top"] option[value="delete"]')
			.click('#doaction')
			.pause(2000)
			.waitForElementVisible('#submit')
			.click('#submit')
			.pause(5000)
			.waitForElementVisible('#message')
			.assert.containsText('#message', 'Sites deleted.')
			.end();
	}
}
