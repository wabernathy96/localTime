// ROUTES FOR USERS

// Require necessary dependencies
const express = require('express');
const routes = express.Router();
const passport = require('passport');
// Require tables from DB testBase
const db = require('../models');
// Require helper functions
let auth_help = require('./helpers/auth_help');

// Signup routes
routes.get('/signup', 
    (req,res) => {
        res.render('pages/signup');
    }
);
routes.post('/signup',passport.authenticate('local-signup', 
        {
            successRedirect: '/dash',
            failureRedirect: '/signup'
        }
    )
);

// Login routes
routes.get('/login', 
    (req,res) => {
        console.log(`WORKING: ${JSON.stringify(req.body)}`);
        res.render('pages/login');
        
    }
);
routes.post('/login', passport.authenticate ('local-login', 
        {
            successRedirect: '/dash',
            failureRedirect: '/login'
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

// Dash route
routes.get('/dash', auth_help.loggedIn, 
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
)

routes.get('/api/get_user',
    (req,res) => {
        db.user.findAll({})
        .then(
            (user) => {
                res.json(user);
            }
        )
    }
)



// Export routes to server.js
module.exports = routes;









