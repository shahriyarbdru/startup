const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: String,
    employee: String,
    note: String,
    source: String,
    external_id: String,
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    status: String,
    address_1: String,
    address_2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    customer_note: String,
    currency: String,
    total_amount: String,
    paid_amount: String,
    due_amount: String,
    payment_method: String,
    shipping_method_title: String,
    products: [mongoose.Schema.Types.Mixed],
}, { timestamps: true })

module.exports = mongoose.model('OrderTemp', orderSchema)