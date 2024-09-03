const express = require('express');

const { createOrder } = require('../controllers/orderController.js');
const route = express.Router();

route.post("/create", createOrder);

module.exports = route;