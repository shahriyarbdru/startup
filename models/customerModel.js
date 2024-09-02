const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
})

module.exports = mongoose.model('Customer', customerSchema)