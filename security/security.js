/**
 * Created by macbook on 12/11/16.
 */
module.exports = function(database, passport) {

    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    var bcrypt = require("bcrypt-nodejs");

    var googleConfig = {

        // clientID     : "109777605510-6grugcuc6lnnnssdr0nc7ivvneusojjh",
        // clientSecret : "bBI9eUViV-4-o0_S6qUCtIWW",
        // callbackURL  : "http://localhost:3000/auth/google/callback"

        clientID     : process.env.GOOGLE_CLIENT_ID, //TODO: set up environment variables on server
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {

        // clientID     : "1451363038237640",
        // clientSecret : "7fe8c7a0beb8695f73f4cd54846faf14",
        // callbackURL  : "http://localhost:3000/auth/facebook/callback"

        clientID     : process.env.FACEBOOK_CLIENT_ID, //TODO: set up environment variables on server
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    var wamUserModel = database.wamModels().userModel;
    var mnUserModel = database.mnModels().userModel;

    passport.use('wam', new LocalStrategy(wamStrategy));
    passport.use('mn', new LocalStrategy(mnStrategy));
    passport.use('google', new GoogleStrategy(googleConfig, googleStrategy));
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    var api = {
        getPassport: getPassport,
        getBCrypt: getBCrypt
    };
    return api;

    /**********************************************************************/
    //wamStrategy, mnStrategy, googleStrategy, facebookStrategy

    function wamStrategy(username, password, done) {
        wamUserModel
            .findUserByUsername(username, password) //password is now encrypted, so can't use findUserByCredentials
            .then(
                function (user1) {
                    if(user1!=null && bcrypt.compareSync(password, user1.password)) {
                        return done(null, user1);
                    } else {
                        return done(null, false);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function mnStrategy(username, password, done) {
        mnUserModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function (err) {
                if (err) {
                    return done(err);
                }
            });
    }

    function googleStrategy(token, refreshToken, profile, done) {
        wamUserModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            first: profile.name.givenName,
                            last:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return wamUserModel.userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        wamUserModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var username = profile.displayName.replace(/ /g,"");
                        var email = profile.emails ? profile.emails[0].value:"";
                        var newFacebookUser = {
                            username: username,
                            firstName: names[0],
                            lastName:  names[names.length - 1],
                            email:     email,
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return wamUserModel.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    /**********************************************************************/
    //Serialize/deserialize

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if (user.type === 'wam') {
            wamUserModel
                .findUserById(user._id)
                .then(function (user) {
                    done(null, user);
                }, function (err) {
                    done(err, null);
                });
        } else if(user.type === 'mn') {
            mnUserModel
                .findUserById(user._id)
                .then(function (user) {
                    done(null, user);
                }, function (err) {
                    done(err, null);
                });
        }
    }

    /**********************************************************************/

    function getPassport() {
        return passport;
    }

    function getBCrypt() {
        return bcrypt;
    }

};