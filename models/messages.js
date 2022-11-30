const mongoose = require('mongoose');

const messaegeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    chatroom: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Messages = mongoose.model('Messages', messaegeSchema);
module.exports = Messages;