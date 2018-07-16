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


cleanPickRoutes.get('/profile', (req, res, next) => {
  let query;
  
  if (req.user.isToc) {
    query = { cleaner: req.user._id };
  } else {
    query = { user: req.user._id };
  }
  
  PickDate
  .find(query)
  .populate('user', 'name')
  .populate('cleaner', 'name')
  .sort('serviceDate')
  .exec((err, serviceDocs) => {
    if (err) {
      next(err);
      return;
    }
    
    res.render('/profile', {
      pickups: serviceDocs
    });
  });
});

cleanPickRoutes.get('/cleaners', (req, res, next) => {
  User.find({ isToc: true }, (err, cleanerList) => {
    if (err) {
      next(err);
      return;
    }

    res.render('userpage/tocCleaners', {
      cleaners: cleanerList
    });
  });
});

cleanPickRoutes.post('/cleaners', (req, res, next) => {
  const userId = req.user._id;
  const cleanerInfo = {
    fee: req.body.fee,
    isToc: true
  }
  User.findByIdAndUpdate(userId, cleanerInfo, { new: true }, (err, theUser) => {
    if (err) {
      next(err);
      return;
    }

    req.user = theUser;

    res.redirect('/profile');
  });
})



cleanPickRoutes.get("/scheduleService/:id", (req, res, next) => {
  res.render("userpage/cleaner-profile", { "message": req.flash("error") });
});

module.exports = cleanPickRoutes;