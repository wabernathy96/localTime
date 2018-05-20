var bCrypt = require('bcrypt-nodejs');
var GoogleStrategy = require('passport-google-oauth20');

var User = require('../models/user');
var keys = require('./keys/key');


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
                User.findOne(
                    {
                        where: {
                            email: email
                        }
                    }
                )
                .then(
                    (user) => {
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
                                    firstName: req.body.firstName,
                                    lastName: req.body.lastName,
                                    userImg: req.body.userImg
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
                    }
                );
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
                    if (!isValidPass (user.password, password)) {
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
    
    // Use passport for Google login
    passport.use(
        new GoogleStrategy(
            {
                clientID: keys.clientID,
                clientSecret: keys.clientSecret,
                callbackURL: keys.callbackURL
            },
            (accessToken, refreshToken, profile, done) => {
                
                console.log(profile);

                const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));

                let newUser = {
                    googleID: profile.id,
                    email: profile.emails[0].value,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    userimg: image
                }

                User.findOne(
                    {
                        googleID: profile.id
                    }
                )
                .then(
                    (user) => {
                        if(user){
                            done(null, user);
                        }else{
                            new User(newUser)
                            .save()
                            .then(
                                (user) => 
                                done(null,user)
                            );
                        }
                    }
                );
            }
        )
    );

    
    //serialize
    passport.serializeUser(
        (user, done) => {
            done(null, user.userId);
        }
    );

    // deserialize user 
    passport.deserializeUser(
        (userId, done) => {
            User.findById(userId)
            .then(
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
};
