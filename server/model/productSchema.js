const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
    productCategory: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true,
    },
    productTitle: {
        type: String,
        required: true
    },
    isNew: { type: String, },
    productPrice: {
        type: Number,
        required: true
    },
    productImage: {
        type: String
    },
});

// Create the Product model
const Product = mongoose.model('products', productSchema);

module.exports = Product;
