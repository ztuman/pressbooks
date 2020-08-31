module.exports = {
	beforeEach: function (browser) {
		console.log('Signing in...');
		browser.globals.functionHelpers = require('../../helpers/functions.js');
		browser = browser.globals.functionHelpers.loginAdminUser(browser);
		if (browser.globals.now === undefined) {
			browser.globals.now = Date.now();
		}
	},
	'Creating test book and 2 chapters': function (browser) {
		let bookURL = 'e2etestbook' + browser.globals.now;
		const bookData = require('../../dataInputs/book.js');
		let totalCreatedChapters = 1; // default chapter

		//Create book
		browser
			.url(process.env.HOST_TEST + 'wp/wp-signup.php')
			.waitForElementVisible('#signup-content')
			.setValue('#blogname', bookURL)
			.setValue('#blog_title', bookData.title + ' ' + browser.globals.now)
			.click('.submit')
			.pause(7000)
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
	},
	'Create H5P Activity': function(browser) {
		let bookURL = 'e2etestbook' + browser.globals.now;
		const h5pActivities = require('../../dataInputs/h5pActivities');
		browser
			.url(process.env.HOST_TEST + bookURL + '/wp-admin/admin.php?page=h5p_new')
			.click('.button-primary')
			.pause(2000)
			.waitForElementVisible('.h5p-editor-iframe')
			.pause(3000)
			.frame(0)
			.waitForElementVisible('#h5p-multichoice')
			.click('#h5p-multichoice')
			.pause(2000)
			.elements('css selector', '.button-install', (btn) => {
				btn.value.forEach((v) => {
					// Firefox - Safari exception
					if (!v.hasOwnProperty('ELEMENT')) {
						v.ELEMENT = Object.values(v)[0];
					}
					browser.elementIdText(v.ELEMENT, (text) => {
						if (text.value.search('Install') >= 0) {
							browser.elementIdClick(v.ELEMENT,  () => {
								browser
									.pause(5000)
									.waitForElementVisible('.button-use')
									.click('.button-use')
									.pause(2000)
									.waitForElementVisible('#field-extratitle--1')
									.setValue('#field-extratitle--1', h5pActivities.multipleChoice[0].title)
									.click('#field-question-15')
									.pause(1000)
									.execute(
										function setText(content) {
											let frame = document.getElementsByClassName('cke_wysiwyg_frame')[0];
											frame.contentWindow.document.getElementsByClassName('cke_contents_ltr')[0].innerText = content;
										}, [h5pActivities.multipleChoice[0].question]
									)
									.click('#field-text-17')
									.pause(1000)
									.execute(
										function setText(content) {
											let frame = document.getElementsByClassName('cke_wysiwyg_frame')[0];
											frame.contentWindow.document.getElementsByClassName('cke_contents_ltr')[0].innerText = content;
										}, [h5pActivities.multipleChoice[0].options[0].text]
									)
									.click('#field-text-22')
									.pause(1000)
									.execute(
										function setText(content) {
											let frame = document.getElementsByClassName('cke_wysiwyg_frame')[0];
											frame.contentWindow.document.getElementsByClassName('cke_contents_ltr')[0].innerText = content;
										}, [h5pActivities.multipleChoice[0].options[1].text]
									)
									.setValue('#field-feedback-30', h5pActivities.multipleChoice[0].feedbackScore)
									.frame(null)
									.click('.button-large')
									.pause(4000)
									.waitForElementVisible('.h5p-wp-admin-wrapper')
									.assert.containsText('#wpbody-content', h5pActivities.multipleChoice[0].title)
									.end();
							});
						}
					});
				});
			});
	},
	'Add H5P Activity to a chapter': function(browser) {
		let bookURL = 'e2etestbook' + browser.globals.now;
		const bookData = require('../../dataInputs/book.js');
		const h5pActivities = require('../../dataInputs/h5pActivities');
		browser
			.url(process.env.HOST_TEST + bookURL + '/wp-admin/edit.php?post_type=chapter')
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
							typeof(text.value.search) === 'function' &&
							text.value.search(bookData.parts[0].chapters[0].title)
						) {
							browser.elementIdClick(v.ELEMENT,  () => {
								browser
									.waitForElementVisible('#title')
									.click('#add-h5p')
									.pause(1500)
									.waitForElementVisible('.h5p-insert')
									.click('.h5p-insert')
									.pause(1500)
									.click('#publish')
									.pause(2000)
									.click('#editable-post-name')
									.pause(2000)
									.waitForElementVisible('.h5p-iframe-wrapper')
									.frame('h5p-iframe-1')
									.assert.containsText(
										'.h5p-question-introduction',
										h5pActivities.multipleChoice[0].question
									)
									.end();
							});
							return true;
						}
					});
				});
			});
	},
	'Delete created book': function (browser) {
		browser
			.url(process.env.HOST_TEST + 'wp/wp-admin/network/sites.php')
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
			.pause(3000)
			.waitForElementVisible('#message')
			.assert.containsText('#message', 'Sites deleted.')
			.end();
	}
}
