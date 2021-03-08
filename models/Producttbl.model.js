const mongoose = require('mongoose');

const Products = mongoose.Schema({
    pname: String,
    pprice: Number,
    pimg: String,
    pgallery: {
    	type: String,
    	default:null
    },
    pdesc: String,
    cname: String,
});

module.exports = mongoose.model('Producttbl', Products);