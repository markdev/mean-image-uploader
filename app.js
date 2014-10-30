// Declare variables
var express 		= require('express')
  ,	bodyParser 		= require('body-parser')
  , multer			= require('multer')
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
app.use(multer({
	dest: "./images/tmp"
}));

//configure server routes
require('./server/routes/api-routes')(app)
//require('./server/routes/server-routes')(app); // TODO: set this up later

app.listen(config.port);
console.log("app is listening on port " + config.port + "...");



/*
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'sunzora1@gmail.com',
        pass: 'sunzora83'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
    to: 'mark.karavan@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
*/