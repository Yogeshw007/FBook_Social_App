const Messages = require('../models/messages');
const User = require('../models/user');

module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://localhost:8000"
        }
    });

    io.sockets.on('connection', function (socket) {
        console.log('new connection received', socket.id);

        socket.on('disconnect', function () {
            console.log('socket disconnected!');
        });

        // When an join_name event is emitted then the callback will be called - User log in and join the chat
        socket.on('join_room', function (data) {
            console.log('joining request rec.', data);

            socket.join(data.chatroom);

            // when a new user is joined user_joined event will be fired
            io.in(data.chatroom).emit('user_joined', data);
        });


        socket.on('send_message', async function (data) {
            console.log('send-message', data);

            let user = await User.findOne({ email: data.user_email });

            await Messages.create({
                user: user._id,
                message: data.message,
                chatroom: data.chatroom
            })

            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}