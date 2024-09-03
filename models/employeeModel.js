const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String, 
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
    },
    orderlist: {
        type: [String],
    },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema)