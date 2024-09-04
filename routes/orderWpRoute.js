const express = require('express');

const { createWpOrder } = require('../controllers/orderWpController.js');
const route = express.Router();

route.post("/create/:id", createWpOrder);

module.exports = route;