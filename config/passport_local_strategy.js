const passport = require('passport');
const LocalStrategry = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategry({
    usernameField: 'email',
    passReqToCallback: true
},
    function (req, email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password) {
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));


passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in deserialize user ', err);
        }
        return done(null, user);
    })
});

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/users/signin');
}

// Middleware uses req, res, next
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;