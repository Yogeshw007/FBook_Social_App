const User = require('../models/user');
const Post = require('../models/post');
const Messages = require('../models/messages');
const path = require('path');

module.exports.posts = async function (req, res) {
    let users = await User.find({}).populate('friendship')
    let posts = await Post.find({}).populate('comments').populate('createdBy');
    let messages = await Messages.find({}).populate('user');
    let user = await User.findById(req.user._id);

    console.log('user', req.user)

    return res.render('posts', {
        title: 'FBook | Posts',
        all_users: users,
        user,
        posts: posts,
        messages
    });
}

module.exports.createPost = function (req, res) {
    return res.render('create_post', {
        title: 'FBook | Create Post'
    });
}

module.exports.addPost = async function (req, res) {

    await Post.uploadPost(req, res, async function (err) {
        if (err) {
            console.log('Error in uploading file ', err);
        }

        let fileName = req.file.path.split('\\').slice(-1);

        await Post.create({
            title: req.body.title,
            image: Post.postImagePath + "/" + fileName,
            createdBy: req.user._id
        });
    });

    return res.redirect('/');
}