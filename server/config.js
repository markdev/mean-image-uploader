var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://127.0.0.1/sunzora',
		redis: {
			host: '127.0.0.1',
			port: '6379'
		},
		rootDir: '/var/www/sunzora-proto/',
		port: process.env.PORT || 2345
	},
	production: {
		db: 'mongodb://127.0.0.1/sunzora',
		redis: {
			host: '127.0.0.1',
			port: '6379'
		},
		rootDir: '/var/www/sunzora-proto/',
    	port: process.env.PORT || 80
	}
}
