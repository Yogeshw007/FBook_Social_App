const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const USRES_IMG_PATH = path.join('/uploads/users/avatar');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    friendship: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship'
        }
    ],
    avatar: {
        type: String,
        required: true
    }
});

// userSchema.methods.toJSON = function () {
//     var userObject = this.toObject();
//     delete userObject.password;
//     return userObject;
// }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(path.join(__dirname, '..', USRES_IMG_PATH));
        cb(null, path.join(__dirname, '..', USRES_IMG_PATH))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

userSchema.statics.uploadAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.usersImgPath = USRES_IMG_PATH;

const User = mongoose.model('User', userSchema);
module.exports = User;