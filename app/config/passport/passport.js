var bCrypt = require('bcrypt-nodejs');

module.exports = (passport, user) => {
    let User = user;
    let LocalStrategy = require('passport-local').Strategy;

    // Use passport for local signup
    passport.use('local-signup', 
        new LocalStrategy (
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            (req, email, password, done) => {
                let generateHash = (password) => {
                    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
                };
                User.findOne({
                    where: {
                        email: email
                    }
                }).then(function(user) {
                 
                    if (user){
                        return done(null, false, 
                            {
                                message: 'That email is already taken',
                            }
                        );
                    } else {
                        let userPassword = generateHash(password);
                        let data =
                            {
                                email: email,
                                password:
                                userPassword,
                                firstname: req.body.firstname,
                                lastname: req.body.lastname
                            };
                 
                        User.create(data)
                        .then(
                            (newUser, created) => {
                                if (!newUser) {
                                    return done(null, false);
                                }
                                if (newUser) {
                                    return done(null, newUser);
                                }
                            }
                        );
                    }
                });
            }
        )
    );
    // Use passport for local login
    passport.use('local-login', 
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            (req, email, password, done) => {
                let User = user;
                let isValidPass = (userpass, password) => {
                    return bCrypt.compareSync(password, userpass);
                }
                User.findOne({
                    where: {
                        email: email
                    }
                }).then((user) => {
                    if (!user) {
                        return done(null, false, 
                            {
                                message: 'Email does not exist'
                            }
                        );
                    }
                    if (!isValidPass(user.password, password)) {
                        return done(null, false, 
                            {
                                message: 'Incorrect password.'
                            }
                        );
                    }
                    var userinfo = user.get();
                    return done(null, userinfo);
                }).catch(
                    (err) => {
                        console.log("Error:", err);
                        return done(null, false, 
                            {
                                message: 'Something went wrong with your Signin'
                            }
                        );
                    }
                );
            }
        )
    );
    // Serialize user
    passport.serializeUser(
        (user, done) => {
            done(null, user.user_id);
        }
    );
    // Deserialize user
    passport.deserializeUser(
        (user_id, done) => {
            User.findById(user_id).then(
                (user) => {
                    if (user) {
                        done(null, user.get());
                    } else {
                        done(user.errors, null);
                    }
                }
            );
        }
    );
}