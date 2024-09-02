const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoute = require('./routes/userRoute.js');

const app = express();

app.use(cors());
//app.use(bodyParser.json());

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

app.use('/user', userRoute);

module.exports = app;
