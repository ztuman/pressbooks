module.exports = {
	beforeEach: function (browser) {
		console.log('Signing in...');
		browser.globals.functionHelpers = require('../../helpers/functions.js');
		browser = browser.globals.functionHelpers.loginAdminUser(browser);
		if (browser.globals.now === undefined) {
			browser.globals.now = Date.now();
			browser.globals.bookURL = 'e2etestbook' + browser.globals.now;
		}
	},
	'Creating test book and 2 chapters': function (browser) {
		let bookURL = browser.globals.bookURL;
		const bookData = require('../../dataInputs/book.js');
		let totalCreatedChapters = 1; // default chapter

		//Create book
		browser
			.url(process.env.HOST_TEST + 'wp/wp-signup.php')
			.waitForElementVisible('#signup-content')
			.setValue('#blogname', bookURL)
			.setValue('#blog_title', bookData.title + ' ' + browser.globals.now)
			.click('.submit')
			.pause(3000)
			.url(process.env.HOST_TEST + bookURL + '/wp-admin/')
			.pause(2000)
			.waitForElementVisible('#wp-admin-bar-site-name')
			.assert.containsText(
				'#wp-admin-bar-site-name',
			bookData.title + ' ' + browser.globals.now
			);
		// create parts
		for (let p = 0; p < bookData.parts.length; p ++) {
			browser = browser.globals.functionHelpers.createPost(
				browser,
				bookURL,
				'part',
				bookData.parts[p].title,
				bookData.parts[p].content
			);
			// create chapters
			for (let c = 0; c < bookData.parts[p].chapters.length; c ++) {
				browser = browser.globals.functionHelpers.createPost(
					browser,
					bookURL,
					'chapter',
					bookData.parts[p].chapters[c].title,
					bookData.parts[p].chapters[c].content,
					bookData.parts[p].title
				);
				totalCreatedChapters ++;
			}
		}
		// create front and back matters
		for (let fm = 0; fm < bookData.frontMatter.length; fm ++) {
			browser = browser.globals.functionHelpers.createPost(
				browser,
				bookURL,
				'front-matter',
				bookData.frontMatter[fm].title,
				bookData.frontMatter[fm].content
			);
		}
		for (let bm = 0; bm < bookData.backMatter.length; bm ++) {
			browser = browser.globals.functionHelpers.createPost(
				browser,
				bookURL,
				'back-matter',
				bookData.backMatter[bm].title,
				bookData.backMatter[bm].content
			);
		}
		// check chapters quantity
		browser
			.url(process.env.HOST_TEST + bookURL + '/wp-admin/edit.php?post_type=chapter')
			.waitForElementVisible('.all')
			.assert.containsText('.all', totalCreatedChapters.toString())
			.end();
	}
}
