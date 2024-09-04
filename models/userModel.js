const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    phone: String,
    address_1: String,
    address_2: String,
    orders: [String],
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema)