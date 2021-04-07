const mongoose = require('mongoose');

const OrderitemSchema = mongoose.Schema({
	order_id: String,
    product_id: String,
    qty: String,
    price: String,
    email: String,
    pmode: String,
    grand_total: Number,
    order_on: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Orderitemtbl', OrderitemSchema);