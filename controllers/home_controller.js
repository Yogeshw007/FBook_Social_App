const User = require('../models/user');

module.exports.home = async function (req, res) {
    if (req.user) {
        return res.redirect('/posts');
    } else {
        return res.render('home', {
            title: 'FBook | Home'
        });
    }
}