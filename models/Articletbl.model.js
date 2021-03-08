const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    aname: String,
    adesc: String,
    apic: String,
    created_on: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Articletbl', ArticleSchema);