module.exports = {
	'Login as Admin user' (browser) {
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
			.waitForElementVisible('#wp-admin-bar-my-account')
			.assert.containsText(
				'#wp-admin-bar-my-account',
				'Hello, ' + process.env.ADMIN_USERNAME
			)
			.end();
	}
};
