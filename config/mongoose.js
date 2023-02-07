const mongoose = require('mongoose');
const env = require('../config/environment');

mongoose.connect(`mongodb+srv://yogeshwar:yogesh12345@cluster0-2354234.7eps74w.mongodb.net/test`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', function () {
    console.log('Connected to Database:: MongoDB');
});

module.exports = db;