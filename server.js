const Sequelize = require('sequelize');
const express = require("express");
const ejs = require("ejs")

// Sets up the Express App
let app = express();
let PORT = process.env.PORT || 9001;

// Syncing our sequelize models and then starting our Express app
app.listen(PORT, function() {
  console.log(`App listening on PORT: ${PORT}`)
});

// Middleware
const session = require('express-session');
const passport = require('passport');
const bodyParser = require("body-parser");

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

models.sequelize.sync().then(() => {
  console.log('Loooks grrrRRREEEAATTT!');
}).catch(function(err) {
  console.log(`ERROR WITH DB UPDATE: ${err}`)
});

// Static directory
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routing
  require('./app/controllers/html_controller')(app);
// require("./routes/html-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
// require("./routes/post-api-routes.js")(app);


