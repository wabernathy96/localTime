var authC = require('../controllers/auth_controller');
 
module.exports = (app, passport) => {
    
    app.get('/dash', isLoggedIn, authC.dash);
    
    // Signup routes
    app.get('/signup', authC.signup);
    app.post('/signup', passport.authenticate          ('local-signup', 
            {
                successRedirect: '/dash',
                failureRedirect: '/signup'
            }
        )
    );

    // Login routes
    app.get('/login', authC.login);
    app.post('/login', passport.authenticate          ('local-login', 
            {
                successRedirect: '/dash',
                failureRedirect: '/login'
            }
 
        )
    );

    // Logout routes
    app.get('/logout', authC.logout);

    // Planner routes
    app.get('/planner', authC.planner)

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/login');
    }
 
}