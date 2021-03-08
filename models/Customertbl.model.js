const mongoose = require('mongoose');

const RegisterUser = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    number: String,
    verified: {
		type: Boolean,
		default: 0
	},
	otp: {
		type: String,
		default: null
	},
	registered: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Customertbl', RegisterUser);