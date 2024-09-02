const express = require('express');

const { createCustomer } = require('../controllers/customerController.js');
const route = express.Router();

route.post("/create", createCustomer);

module.exports = route;