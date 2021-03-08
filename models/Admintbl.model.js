const mongoose = require('mongoose');

const Admins = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('Admintbl', Admins);