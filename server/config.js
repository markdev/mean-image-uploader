var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://127.0.0.1/sunzora',
		port: process.env.PORT || 3000
	},
	production: {
		db: 'mongodb://127.0.0.1/sunzora',
    	port: process.env.PORT || 80
	}
}