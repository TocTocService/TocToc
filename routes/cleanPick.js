const express = require("express");
const cleanPickRoutes = express.Router();
const PickDate = require("../models/PickDate");
const User = require('../models/User');

cleanPickRoutes.use((req, res, next) => {
  if (req.user){
    next();
    return;
  }
  res.redirect("/login");
});




module.exports = cleanPickRoutes;