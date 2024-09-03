const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    employee: {
        type: String,
    },
    note: {
        type: String,
    },
    external_id: {
        type: String,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    status: {
        type: String,
    },
    address_1: {
        type: String,
    },
    address_2: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zip: {
        type: String,
    },
    country: {
        type: String,
    },
    customer_note: {
        type: String,
    },
    currency: {
        type: String,
    },
    total_amount: {
        type: Number,
    },
    paid_amount: {
        type: Number,
    },
    due_amount: {
        type: Number,
    },
    payment_method: {
        type: String,
    },
    data: {
        type: mongoose.Schema.Types.Mixed, // Use Mixed type to store any kind of data
        required: true
      },
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)