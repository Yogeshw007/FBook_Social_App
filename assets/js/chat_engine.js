class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        let self = this;

        this.socket.on('connect', function () {
            console.log('connection established using sockets...!');

            // emits a event('join_room') 
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'fbook'
            });

            self.socket.on('user_joined', function (data) {
                console.log('user joined ', data);
            });

        });

        $('#send-message').click(function () {
            let msg = $('#chat-message-input').val();

            if (msg != '') {
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'fbook'
                });
            }
        });


        self.socket.on('receive_message', function (data) {
            console.log('message received', data.message);

            // <li class="align-self-start border border-dark p-2 rounded mb-2">
            //     <p class="p-0 m-0">Other message</p>
            //     <p class="text-right p-0 m-0" style="font-size: 0.7rem;"><i>Yogesh</i></p>
            // </li>

            let messageType = 'align-self-start border border-dark p-2 rounded mb-2';

            if (data.user_email == self.userEmail) {
                messageType = 'align-self-end border border-dark p-2 rounded mb-2';
            }

            let newMessage = $('<li>');

            newMessage.append($('<p>', {
                'html': data.message,
                'class': 'p-0 m-0'
            }));

            let userInfo = $('<p>', {
                'html': `<i>${data.user_email}</i>`,
                'class': 'text-right p-0 m-0',
            });

            userInfo.css("font-size", "0.7rem");

            newMessage.append(userInfo);

            newMessage.addClass(messageType);

            $('#messages').append(newMessage);
        });
    }
}