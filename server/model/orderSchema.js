const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Address Schema
const addressSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    }
});

// Payment Schema
const paymentSchema = new Schema({
    nameOnCard: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: String,
        required: true,
    },
    expiration: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true,
    }
    // cardNumber: {
    //     type: String,
    //     required: true,
    //     match: [/^\d{16}$/, 'is invalid'], // Assuming a 16-digit card number
    // },
    // expiration: {
    //     type: String,
    //     required: true,
    //     match: [/^\d{2}\/\d{2}$/, 'is invalid'], // Assuming format MM/YY
    // },
    // cvv: {
    //     type: String,
    //     required: true,
    //     match: [/^\d{3}$/, 'is invalid'], // Assuming a 3-digit CVV
    // }
});

// Cart Item Schema
const cartItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

// Order Schema
const orderSchema = new Schema({
    customerId: { type: String},
    orderStatus: { type: String},
    orderCode: {
        type: String,
        required: true,
        unique: true,
    },
    billingAddress: {
        type: addressSchema,
        required: true,
    },
    payment: {
        type: paymentSchema,
        required: true,
    },
    cart: [cartItemSchema],
    totalAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Export the Order model
module.exports = mongoose.model('Order', orderSchema);