const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({
    pid: String,
    email: String,
    rating: Number,
    review: String,
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Ratingtbl', RatingSchema);