const express = require('express');
const app = express();

require('dotenv').config();
const env = require('./config/environment')

const socket = require('./config/chat_sockets');

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen('5000');
console.log('Chat server is listening on port 5000');

const expressLayouts = require('express-ejs-layouts');
const MongoStore = require('connect-mongo');

const mongoose = require('./config/mongoose');
require('passport');
const passport = require('./config/passport_local_strategy');
const passportGoogle = require('./config/passport_google_strategy');
const passportGithub = require('./config/passport_github_strategy');

const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(express.urlencoded());
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(session({
    name: 'fbook',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 100
    },
    store: MongoStore.create(
        {
            mongoUrl: `mongodb+srv://yogeshwar:yogesh12345@cluster0-2354234.7eps74w.mongodb.net/test`,
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(express.static('./assets'));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));

app.listen(env.port, function () {
    console.log(`Server is up and running on port ${env.port}`)
});