module.exports = {
	beforeEach: function (browser) {
		if (browser.globals.now !== undefined) {
			console.log('Signing in...');
			browser.globals.functionHelpers = require('../../helpers/functions.js');
			browser.globals.functionHelpers.loginAdminUser(browser);
		}
	},
	'Upload an image in a chapter': function (browser) {
		let fullPath = require('path').resolve(__dirname + '/../../dataInputs/image1.png');
		browser
			.url(process.env.HOST_TEST + '/wp-admin/edit.php?post_type=chapter')
			.pause(2000)
			.waitForElementVisible('.row-title')
			.elements('css selector', '.row-title', (actions) => {
				actions.value.forEach((v) => {
					// Firefox - Safari exception
					if (!v.hasOwnProperty('ELEMENT')) {
						v.ELEMENT = Object.values(v)[0];
					}
					browser.elementIdText(v.ELEMENT, (text) => {
						if (
							text.value !== undefined &&
							typeof (text.value.search) === 'function' &&
							text.value.search(bookData.parts[0].chapters[0].title)
						) {
							browser.elementIdClick(v.ELEMENT, () => {
								browser
									.waitForElementVisible('#title')
									.click('#insert-media-button')
									.waitForElementVisible('.supports-drag-drop')
									.setValue('input[type="file"]', fullPath)
									.pause(5000)
									.click('.media-button-insert')
									.pause(2000)
									.click('#publish')
									.pause(2000)
									.end();
							});
						}
					});
				});
			});
	}
}
