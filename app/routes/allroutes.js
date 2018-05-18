// ROUTES FOR USERS

// Require necessary dependencies
const express = require('express');
const routes = express.Router();
const passport = require('passport');
// Require tables from DB testBase
const db = require('../models');
// Require helper functions
let auth_help = require('./helpers/auth_help');

let userC = require('../controllers/user_c');

// Signup routes
routes.post('/signup',passport.authenticate('local-signup', 
        {
            successRedirect: '/dash',
            failureRedirect: '/'
        }
    )
);

// Login routes
routes.post('/login', passport.authenticate ('local-login', 
        {
            successRedirect: '/dash',
            failureRedirect: '/'
        }
    )
);

// Google Login Routes
routes.get('/auth/google', passport.authenticate(
    'google', { scope: ['profile', 'email'] }
)
);

routes.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to dashboard.
        res.redirect('/dash');
    }
);

// NEEDS LOGIC!!!!!!!
// Dash route
routes.get('/dash/', auth_help.loggedIn, 
    (req,res) => {
        res.render('pages/auth_dash');
    }
);

// Logout routes
routes.get('/logout', 
    (req,res) => {
        req.logOut();
        res.redirect('/');
    }
);

// Planner routes
routes.get('/planner', 
    (req,res) => {
        console.log("heeeeeeee")
        res.render('pages/create_planner');
    }
);

// Home route
routes.get('/',  
    (req,res) => {
        res.render('pages/home')
    }
);
//view trips route
routes.get('/view',
    (req, res) => {
        res.render('pages/view_trips');
    }
);

routes.get('/plan',
    (req, res) => {
        res.render('pages/plan_trip');
    }
);



routes.get('/api/all_users',
    (req,res) => {
       userC.getAll(req,res);
    }
)



// Export routes to server.js
module.exports = routes;









