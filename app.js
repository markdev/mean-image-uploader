// Declare variables
var express 		= require('express')
  , path			= require('path')
  ,	bodyParser 		= require('body-parser')
  , cookieParser    = require('cookie-parser')
  , expressSession  = require('express-session')
  , mongoose        = require('mongoose')
  , passport		= require('passport')
  , LocalStrategy   = require('passport-local').Strategy
  , multer			= require('multer')
  // ,	mongoose 		= require('mongoose')
  ;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var config = require('./server/config')[env];

//initialize database
require('./server/db')(config);

//init User model
var UserSchema = require('./server/models/User').User
  , User = mongoose.model('User')

// Configure express
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
	// now add redis
	secret: process.env.SESSION_SECRET || 'foobarbaz'
  , resave: false
  , saveUninitialized: false	
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	if(user) {
		done(null, user._id);
	}
});

passport.deserializeUser(function(id, done) {
	console.log("Deserializing User");
	User.findOne({_id:id}).exec(function(err, user) {
		if(user) {
			// consider not putting in the whole user
			return done(null, user);
		} else {
			return done(null, false);
		}
	})
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		console.log("DEBUG 2");
		User.findOne({username:username}).exec(function(err, user) {
			console.log("DEBUG 3");
			if (user && user.authenticate(password)) {
				console.log("authenticated!");
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}
));

app.use(multer({
	dest: "./images/tmp"
}));
/*
app.get('/', function(req, res) {
	res.render('test');
});
*/

//configure server routes
require('./server/routes/api-routes')(app)
//require('./server/routes/server-routes')(app); // TODO: set this up later

app.listen(config.port);
console.log("app is listening on port " + config.port + "...");