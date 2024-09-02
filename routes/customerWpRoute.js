const express = require('express');

const { createWpCustomer } = require('../controllers/customerWpController.js');
const route = express.Router();

route.post("/create", createWpCustomer);

module.exports = route;