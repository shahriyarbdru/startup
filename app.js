const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoute = require('./routes/userRoute.js');
const orderWpRoute = require('./routes/orderWpRoute.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

app.use('/api/wp/order', orderWpRoute);
app.use('/user', userRoute);

module.exports = app;

