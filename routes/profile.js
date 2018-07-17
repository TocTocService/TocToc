const express = require("express");
const profile = express.Router();
const PickDate = require("../models/PickDate");
const User = require('../models/User');

profile.get('/profile', (req, res, next) => {
  let query;

  
  if (req.user.isToc) {
    query = { cleaner: req.user._id };
  } else {
    query = { user: req.user._id };
  }
  
  console.log(query)

  PickDate
  .find(query)
  .populate('user')
  .populate('cleaner')
  .sort('serviceDate')
  .then(services => res.render('userpage/profile', {services}))
  .catch(err => console.log(err));
});

module.exports = profile;