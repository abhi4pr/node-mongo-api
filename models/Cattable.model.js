const mongoose = require('mongoose');

const Categories = mongoose.Schema({
    cname: String,
});

module.exports = mongoose.model('Cattable', Categories);