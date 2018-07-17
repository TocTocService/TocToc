const express = require("express");
const cleanPickRoutes = express.Router();
const PickDate = require("../models/PickDate");
const User = require("../models/User");

cleanPickRoutes.use((req, res, next) => {
  if (req.user) {
    next();
    return;
  }
  res.redirect("/login");
});

cleanPickRoutes.get("/cleaners", (req, res, next) => {
  User.find({ isToc: true }, (err, cleanerList) => {
    if (err) {
      next(err);
      return;
    }

    res.render("userpage/ListCleaners", {
      cleaners: cleanerList
    });
  });
});

cleanPickRoutes.post("/cleaners", (req, res, next) => {
  const serviceInfo = {
    serviceDate: req.body.serviceDate,
    cleaner: req.body.cleanerId,
    user: req.user._id
  };

  const theService = new PickDate(serviceInfo);
  // console.log(theService)

  theService.save(err => {
    if (err) {
      next(err);
      return;
    }

    res.redirect("/profile");
  });
});

cleanPickRoutes.get("/scheduleService/:id", (req, res, next) => {
  const cleanerId = req.params.id;

  User.findById(cleanerId, (err, cleaner) => {
    if (err) {
      next(err);
      return;
    }

    res.render("userpage/cleaner-profile", {
      cleaner
    });
  });
});


module.exports = cleanPickRoutes;
