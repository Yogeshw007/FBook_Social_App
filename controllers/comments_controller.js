const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.addComment = async function (req, res) {
    let comment = await Comment.create({
        title: req.body.title,
        addedby: req.user.name,
        post: req.params.id
    });

    let post = await Post.findById(req.params.id);

    await post.comments.push(comment);
    await post.save();

    return res.redirect('back');
}

module.exports.addReaction = async function (req, res) {
    let comment = await Comment.findById(req.params.id);

    comment.reaction = req.body.reaction;
    await comment.save();

    return res.redirect('back');
}