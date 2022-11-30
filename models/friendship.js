const mongoose = require('mongoose');

const friendshipSchema = mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    addedby: {
        type: String,
        required: true,
        unique: false
    }
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;