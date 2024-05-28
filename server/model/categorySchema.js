const mongoose = require('mongoose');

// Define the Product schema
const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    categoryTitle: { type: String, required: true },
    isNew: { type: String, }
});

// Create the Category model
const Category = mongoose.model('Categories', categorySchema);

module.exports = Category;
