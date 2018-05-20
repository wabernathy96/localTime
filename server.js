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
app.use(session({ secret: 'djcat', resave: true, saveUninitialized: true }));
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
// let api_routes= require ('./app/routes/api_routes');
let routes = require('./app/routes/allroutes');
app.use('/', routes);



// Sync Database
models.sequelize.sync({force:true}).then(() => {
  console.log('Server is synced and Live');
  // Start server
  app.listen(PORT, function () {
    console.log(`App listening on PORT: ${PORT}`);
  });
}).catch(function (err) {
  console.log(`ERROR WITH DB UPDATE: ${err}`);
});

