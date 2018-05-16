// ROUTES FOR USERS

// Require necessary dependencies
const express = require('express');
const user_routes = express.Router();
const passport = require('passport');
// Require helper functions
let auth_help = require('./helpers/auth_help');

// Signup routes
user_routes.get('/signup', 
    (req,res) => {
        res.render('pages/signup');
    }
);
user_routes.post('/signup',passport.authenticate('local-signup', 
        {
            successRedirect: '/dash',
            failureRedirect: '/signup'
        }
    )
);

// Login routes
user_routes.get('/login', 
    (req,res) => {
        res.render('pages/login');
    }
);
user_routes.post('/login', passport.authenticate ('local-login', 
        {
            successRedirect: '/dash',
            failureRedirect: '/login'
        }

    )
);

// Google Login Routes
user_routes.get('/auth/google', passport.authenticate(
    'google', { scope: ['profile', 'email'] }
)
);

user_routes.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to dashboard.
        res.redirect('/dash');
    }
);


// Dash route
user_routes.get('/dash', auth_help.loggedIn, 
    (req,res) => {
        res.render('pages/auth_dash');
    }
);

// Logout routes
user_routes.get('/logout', 
    (req,res) => {
        req.logOut();
        res.redirect('/');  
    }
);

// Planner routes
user_routes.get('/planner', 
    (req,res) => {
        res.render('pages/create_planner');
    }
);

// Home route
user_routes.get('/',  
    (req,res) => {
        res.render('pages/home')
    }
)

// Export routes to server.js
module.exports = user_routes;









