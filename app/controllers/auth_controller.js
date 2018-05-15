// CONTROLLERS FOR AUTHORIZED USER VIEWS

var exports = module.exports = {
};

exports.dash = (req,ejs) => {
    ejs.render('pages/auth_dash');
}

exports.signup = (req,ejs) => {
    ejs.render('pages/signup');
}

exports.login = (req,ejs) => {
    ejs.render('pages/login');
}

exports.logout = (req,ejs) => {
    req.session.destroy(
        (err) => {
            ejs.redirect('/');
        }
    );
}

exports.planner = (req,ejs)  => {
    ejs.render('pages/create_planner');
}