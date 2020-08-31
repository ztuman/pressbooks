module.exports = {
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
