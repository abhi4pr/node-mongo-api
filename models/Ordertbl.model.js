const mongoose = require('mongoose');

const OrdersSchema = mongoose.Schema({
	name: String,
    email: String,
    address: String,
    number: String,
    pmode: String,
    grand_total: Number,
    order_on: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Ordertbl', OrdersSchema);