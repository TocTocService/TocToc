const express = require("express");
const rating = express.Router();
const Rating = require("../models/Rating");

rating.get('/rates', (req, res, next) => {
  res.render('rates');
});

module.exports = rating;