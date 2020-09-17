module.exports = {
	loginAdminUser: function (browser) {
		return browser
			.url(process.env.HOST_TEST + 'wp/wp-login.php')
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
	createPost: function (browser, bookURL, type, title, content, partTitle = '') {
		browser
			.url(process.env.HOST_TEST + bookURL + '/wp-admin/post-new.php?post_type=' + type)
			.waitForElementVisible('#post')
			.waitForElementVisible('#content_ifr')
			.pause(2000)
			.setValue('#title', title)
			// frame function and setValue will takes more time since content is a big text
			.execute(
				function setText(content) {
					let frame = document.getElementById('content_ifr');
					frame.contentWindow.document.getElementById('tinymce').innerText = content;
				}, [ content]
			);
		if (partTitle.length > 0) {
			browser
				.setValue('select[id="parent_id"]', partTitle);
		}
		return browser
			.click('#publish')
			.pause(2000)
			.waitForElementVisible('#sample-permalink');
	}
}
