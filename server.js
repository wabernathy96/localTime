const Sequelize = require('sequelize');
const express = require("express");
const path = require("path");
//Templating
const ejs = require("ejs");
// Middleware
const session = require('express-session');
const passport = require('passport');
const bodyParser = require("body-parser");


// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 9001;

// Sets up the Express app to handle data parsing
// Body-Parser MiddleWare
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Middleware
// Session secret
app.use(session({ secret: 'djcat', resave: true, saveUninitialized:true})); 
app.use(passport.initialize());
// Persistent login sessions
app.use(passport.session()); 

// Require env
var env = require('dotenv').load();

// Models
var models = require('./app/models');

// Serve public file to ejs
app.use(express.static(__dirname + '/app/public'));

// Set ejs views
app.set('views', './app/views/');
app.set('view engine', 'ejs');


// Passport Strategies
require('./app/config/passport')(passport, models.user);

// Routing
// User routes
<<<<<<< HEAD
let routes = require ('./app/routes/allroutes')
app.use('/', routes);
=======
// let api_routes= require ('./app/routes/api_routes');
let user_routes = require ('./app/routes/user_routes');
app.use('/', user_routes);

>>>>>>> 4eb11a13e665a69b7a52acb1cc3f3185ddc08ddb


// Sync Database
models.sequelize.sync().then(() => {
  console.log('Server is synced and Live');
}).catch(function(err) {
  console.log(`ERROR WITH DB UPDATE: ${err}`);
});

// Start server
app.listen(PORT, function() {
  console.log(`App listening on PORT: ${PORT}`);
});