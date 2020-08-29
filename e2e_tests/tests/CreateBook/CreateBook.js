module.exports = {
	beforeEach: function (browser) {
		console.log('Signing in...');
		browser
			.url(process.env.HOST_TEST + '/wp/wp-login.php')
			.waitForElementVisible('body')
			.assert.visible('#user_login')
			.assert.visible('#user_pass')
			.assert.visible('#wp-submit')
			.setValue('#user_login', process.env.ADMIN_USERNAME)
			.setValue('#user_pass', process.env.ADMIN_PASSWORD)
			.click('input[id=wp-submit]')
			.pause(3000)
			.waitForElementVisible('#wp-admin-bar-my-account');
	},
	'Creating test book and 2 chapters': function (browser) {
		let now = Date.now();
		let bookURL = 'testbook' + now;
		let chapterTitles = [
			'Test Chapter #1',
			'Test Chapter #2'
		];
		let chapterContents = [
			'Content for chapter #1 '.repeat(200) + '\n\n'
				+ 'Pressbooks e2e test '.repeat(200) + 'Hey! I have a FN[footnote]test footnote content[/footnote] ' +
				+ '\n\n' + 'Last paragraph '.repeat(300),
			'Content for chapter #2 '.repeat(200) + '\n\n'
			+ 'Pressbooks e2e test '.repeat(200) + 'Hey! I have a FN[footnote]test footnote content[/footnote] ' +
			+ '\n\n' + 'Last paragraph '.repeat(300),
		];
		let createChapter = function (bw, q) {
			return bw
				.url(process.env.HOST_TEST + bookURL + '/wp-admin/post-new.php?post_type=chapter')
				.waitForElementVisible('#post')
				.waitForElementVisible('#content_ifr')
				.pause(2000)
				.setValue('#title', chapterTitles[q])
				// frame function and setValue will takes more time since content is a big text
				.execute(
					function setText(content) {
						let frame = document.getElementById('content_ifr');
						frame.contentWindow.document.getElementById('tinymce').innerText = content;
					}, [chapterContents[q]]
				)
				.click('#publish')
				.pause(2000)
				.waitForElementVisible('#sample-permalink');
		};

		//Create book
		browser
			.url(process.env.HOST_TEST + 'wp/wp-signup.php')
			.waitForElementVisible('#signup-content')
			.setValue('#blogname', bookURL)
			.setValue('#blog_title', 'Test book ' + now)
			.click('.submit')
			.pause(7000)
			.waitForElementVisible('#wp-admin-bar-site-name')
			.assert.containsText('#wp-admin-bar-site-name', 'Test book ' + now);
		browser = createChapter(browser, 0);
		browser = createChapter(browser, 1)
			.url(process.env.HOST_TEST + bookURL + '/chapter/test-chapter-1/')
			.waitForElementVisible('#content')
			.assert.containsText('#content', chapterTitles[0])
			.assert.containsText('#content', chapterContents[0].substr(0, 100))
			.assert.containsText('.footnotes', 'test footnote content')
			.end();
	}

}
