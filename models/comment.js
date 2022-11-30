const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    addedby: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    reaction: {
        type: String
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;