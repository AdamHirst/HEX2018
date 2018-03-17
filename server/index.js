const express       = require('express');
const app           = express();
const mongoose      = require('mongoose');
const passport      = require('passport');
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const session       = require('express-session');
const flash         = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;

let db = require('./app/database.js')(mongoose);

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	db.model.User.findOne({ _id: id }, (err, user) => {
		if (err) return done(err);
		if (!user) return done(null, false, 'User not found.');
		return done(null, user);
	});
});

// Setup view engine
app.set('view engine', 'ejs');

// Setup a static folder
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'hexhack',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy({
  usernameField: "email",
	passwordField: "password"
}, require('./app/authenticate.js')(db)));

// Load Twilio Interface
var twilio = require('./app/twilio.js')(app, db);

// Load routes
require('./app/routes.js')(app, passport, db, twilio);


app.listen(3000, () => console.log("Debugging on port 3000"));
