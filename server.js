const Sequelize = require('sequelize');
const express = require("express");
//Templating
const ejs = require("ejs")
// Middleware
const session = require('express-session');
const passport = require('passport');
const bodyParser = require("body-parser");

// Sets up the Express App
let app = express();
let PORT = process.env.PORT || 9001;

// Sets up the Express app to handle data parsing
// Body-Parser MiddleWare
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Passport Middleware
// Session secret
app.use(session({ secret: 'djcat',resave: true, saveUninitialized:true})); 
app.use(passport.initialize());
// Persistent login sessions
app.use(passport.session()); 

// Require env
var env = require('dotenv').load();

// Models
let models = require('./app/models');

// Static directory
app.use(express.static(__dirname + '/public'));
app.set('views', './app/views/')
app.set('view engine', 'ejs');

// Routing
require('./app/routes/auth_routes')(app, passport);
require('./app/routes/non_auth_routes') (app);


// Passport Strategies
require('./app/config/passport/passport')(passport, models.user);

// Sync Database
models.sequelize.sync({force:true}).then(() => {
  console.log('Loooks grrrRRREEEAATTT!');
}).catch(function(err) {
  console.log(`ERROR WITH DB UPDATE: ${err}`)
});

// Start server
app.listen(PORT, function() {
  console.log(`App listening on PORT: ${PORT}`)
});


