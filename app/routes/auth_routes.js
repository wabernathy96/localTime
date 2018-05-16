// ROUTES FOR AUTH USERS

// Require exported methods from auth_controller
var authC = require('../controllers/auth_controller');
var db = require("../models");

// Export routes to server.js
module.exports = (app, passport) => {

    app.get('/dash', isLoggedIn, authC.dash);

    // Signup routes
    app.get('/signup', authC.signup);
    app.post('/signup', passport.authenticate('local-signup',
        {
            successRedirect: '/dash',
            failureRedirect: '/signup'
        }
    )
    );

    // Login routes
    app.get('/login', authC.login);
    app.post('/login', passport.authenticate('local-login',
        {
            successRedirect: '/dash',
            failureRedirect: '/login'
        }

    )
    );

    // Logout routes
    app.get('/logout', authC.logout);

    
    
        
    // Planner routes
    app.get("/planner", authC.planner), function (req, res) {
        console.log("here")
        // Find one planner with the id in req.params.id and return them to the user with res.json
        db.user.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbAuthor) {
            res.json(dbAuthor);
        });
    }

    // app.post("/api/planner", function (req, res) {
    //     // Create an planner with the data available to us in req.body
    //     console.log(req.body);
    //     db.planner.create(req.body).then(function (dbPlanner) {
    //         res.json(dbplanner);
    //     });
    // });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/login');
    }

}