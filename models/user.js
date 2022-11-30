const mongoose = require('mongoose');

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
    ]
});

userSchema.methods.toJSON = function () {
    var userObject = this.toObject();
    delete userObject.password;
    return userObject;
}

const User = mongoose.model('User', userSchema);
module.exports = User;