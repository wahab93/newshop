const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
    pCategory: {
        type: String,
        required: true
    },
    pName: {
        type: String,
        required: true,
    },
    pTitle: {
        type: String,
        required: true
    },
    pPrice: {
        type: Number,
        required: true
    },
    productImage: {
        type: String
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
});

// Create the Product model
const Product = mongoose.model('products', productSchema);

module.exports = Product;
