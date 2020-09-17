require('dotenv').config({path: '.env.local'});

module.exports = {
	src_folders: ['e2e_tests/tests'],
	selenium: {
		launch_url: process.env.HOST_TEST,
		start_process: true,
		server_path: require('selenium-server').path,
		cli_args: {
			'webdriver.gecko.driver': require('geckodriver').path,
			'webdriver.chrome.driver': require('chromedriver').path
		},
		log_path: './e2e_tests/log'
	},
	test_settings: {
		default: {
			launch_url: process.env.HOST_TEST,
			screenshots : {
				enabled : true,
				on_failure : true,
				on_error : false,
				path : './e2e_tests/screenshots'
			},
			output_folder: './e2e_tests/output'
		},
		chrome: {
			desiredCapabilities : {
				browserName : 'chrome',
				alwaysMatch: {
					acceptInsecureCerts: true
				},
				chromeOptions: {
					w3c: false
				},
				acceptSslCerts : true
			},
			webdriver: {
				port: 4444,
				start_process: true,
				server_path: require('chromedriver').path,
				log_path: './e2e_tests/log'
			}
		},
		firefox: {
			desiredCapabilities : {
				browserName : 'firefox',
				acceptInsecureCerts: true,
				acceptSslCerts : true,
				ignoreProtectedModeSettings: true,
				unexpectedAlertBehaviour: 'accept'
			},
			webdriver: {
				start_process: true,
				port: 4444,
				server_path: require('geckodriver').path,
				log_path: './e2e_tests/log'
			}
		}
	}
};
