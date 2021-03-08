const mongoose = require('mongoose');

const ContactFormSchema = mongoose.Schema({
    cname: String,
    cemail: String,
    cnumber: String,
    csms: String,
    sent_on: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Cformtable', ContactFormSchema);