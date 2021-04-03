const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    pid: String,
    pname: String,
    pprice: Number,
    ppic: String,
    qty: Number,
    total_price: Number,
    email: String,
});

module.exports = mongoose.model('Carttbl', CartSchema);