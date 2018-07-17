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
  
  console.log(query)

  PickDate
  .find(query)
  .populate('user')
  .populate('cleaner')
  .sort('serviceDate')
  .then(services => res.render('userpage/profile', {services}))
  .catch(err => console.log(err));
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
  const cleanerId = req.params.id;
  

  User.findById(cleanerId, (err, cleaner) => {
    if (err) {
      next(err);
      return;
    }

    res.render('userpage/cleaner-profile', {
      cleaner
    });
  });
});



cleanPickRoutes.post('/scheduleServiceForm', (req, res, next) => {
  const serviceInfo = {
    serviceDate: req.body.serviceDate,
    cleaner: req.body.cleanerId,
    user: req.user._id,
  };

  const theService = new PickDate(serviceInfo);
  // console.log(theService)

  theService.save((err) => {
    if (err) {
      next(err);
      return;
    }

    res.redirect('/profile');
  });
});

module.exports = cleanPickRoutes;