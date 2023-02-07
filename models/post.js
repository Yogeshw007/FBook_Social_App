const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const POST_IMG_PATH = path.join('/uploads/posts/');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', POST_IMG_PATH))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

postSchema.statics.uploadPost = multer({ storage: storage }).single('image');
postSchema.statics.postImagePath = POST_IMG_PATH;

const Post = mongoose.model('Post', postSchema);
module.exports = Post;