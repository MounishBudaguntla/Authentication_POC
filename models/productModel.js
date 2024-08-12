const mongoose = require('mongoose');

//PRODUCT MODEL
const ProductSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, reference: 'User', required: true},   
    name: {type: String, required: true, trim: true, minlength: 1},
    price: {type: Number, required: true, min: 0},
    quantity: {type: Number, required: true, min: 0},
    description: {type: String, required: true, trim: true, minlength: 10},
    isSold: { type: Boolean, default: false }
})

module.exports = mongoose.model('Product', ProductSchema);