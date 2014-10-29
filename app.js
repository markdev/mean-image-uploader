// Declare variables
var express 		= require('express')
  ,	bodyParser 		= require('body-parser')
  // ,	mongoose 		= require('mongoose')
  ;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var config = require('./server/config')[env];

//initialize database
require('./server/db')(config);

//init User model
//var UserSchema = require('./server/models/User').User
//  , User = mongoose.model('User')

// Configure express
app.use(bodyParser());

//configure server routes
require('./server/routes/api-routes')(app)
//require('./server/routes/server-routes')(app); // TODO: set this up later

app.listen(config.port);
console.log("app is listening on port " + config.port + "...");