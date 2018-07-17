const express = require("express");
const profile = express.Router();
const User = require('../models/User');

profile.get('/edit', (req, res) =>{
  res.render('userpage/edit');
});

module.exports = profile;