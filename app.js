// Declare variables
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var crypto = require('crypto');
app.use(bodyParser());

// Mongoose connection
mongoose.connect('mongodb://127.0.0.1/sunzora');

//init User model
var UserSchema = require('./server/models/User').User
  , User = mongoose.model('User')


//configure server routes
require('./server/routes/api-routes')(app)
//require('./server/routes/server-routes')(app);

app.listen(3000);
console.log("app is listening on port 3000");