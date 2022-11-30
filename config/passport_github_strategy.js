const passport = require('passport');
const passportGit = require('passport-github');
const GitStrategy = passportGit.Strategy;
const User = require('../models/user');
const env = require('../config/environment');
const crypto = require('crypto');

passport.use(new GitStrategy({
    clientID: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    callbackURL: env.GITHUB_CALLBACK_URL
}, function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    User.findOne({ email: `${profile.username}@github.com` }).exec(function (err, user) {
        if (err) { console.log('error in github strategy-passport', err); return; }

        if (user) {
            return done(null, user);
        } else {
            User.create({
                name: profile.username,
                email: `${profile.username}@github.com`,
                password: crypto.randomBytes(20).toString('hex')
            }, function (err, user) {
                if (err) { console.log('error in google user strategy-passport', err); return; }
                console.log('User created through github sign in', user);
                return done(null, user);
            });
        }
    });
}
));
