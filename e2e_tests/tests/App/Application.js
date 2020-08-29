module.exports = {
	'Checking login title must contain Log In string title' (browser) {
		browser
			.url(process.env.HOST_TEST + '/wp/wp-login.php')
			.waitForElementVisible('body')
			.assert.titleContains('Log In ‹ pressbooks.test — Pressbooks')
			.end();
	}
};
