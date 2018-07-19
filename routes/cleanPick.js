const express = require("express");
const cleanPickRoutes = express.Router();
const PickDate = require("../models/PickDate");
const User = require("../models/User");
const moment = require("moment");
moment().format();
moment.locale("es");

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
  if (req.body.serviceTime == "" || req.body.serviceDate == "") {
    User.find({ isToc: true })
      .then(cleanerList => {
        res.render("userpage/ListCleaners", {
          cleaners: cleanerList,
          message: "Es necesario indicar hora y fecha"
        });
      })
      .catch(err => {
        console.log(err);
      });
    return;
  }
  const now = new Date();
  const date = new Date(req.body.serviceDate);

  if (now > date || date.getFullYear() >= 2019) {
    User.find({ isToc: true }, (err, cleanerList) => {
      if (err) {
        next(err);
        return;
      }
      res.render("userpage/ListCleaners", {
        message: "No se puede contratar para esas fechas",
        cleaners: cleanerList
      });
    });
    return;
  }

  const serviceInfo = {
    serviceDate: moment(req.body.serviceDate).format("YYYY-MM-DD, dddd"),
    serviceTime: req.body.serviceTime,
    cleaner: req.body.cleanerId,
    user: req.user._id
  };

  const theService = new PickDate(serviceInfo);
  console.log(theService);

  theService.save(err => {
    if (err) {
      next(err);
      return;
    }

    res.redirect("/profile");
  });
});

cleanPickRoutes.post("/publicservicio", (req, res, next) => {
  if (req.body.serviceTime == "" || req.body.serviceDate == "") {
    User.findById(req.body.cleanerId)
      .then(ficha => {
        console.log(ficha)
        res.render("userpage/public", {
          ficha,
          message: "Es necesario indicar hora y fecha"
        });
      })
      .catch(err => {
        console.log(err);
      });
    return;
  }

  const now = new Date();
  const date = new Date(req.body.serviceDate);

  if (now > date || date.getFullYear() >= 2019) {
    User.findById(req.body.cleanerId, (err, ficha) => {
      if (err) {
        next(err);
        return;
      }
      res.render("userpage/public", {
        message: "No se puede contratar para esas fechas",
        ficha
      });
    });
    return;
  }

  const serviceInfo = {
    serviceDate: moment(req.body.serviceDate).format("YYYY-MM-DD, dddd"),
    serviceTime: req.body.serviceTime,
    cleaner: req.body.cleanerId,
    user: req.user._id
  };

  const theService = new PickDate(serviceInfo);

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

cleanPickRoutes.get("/delete/:id", (req, res) => {
  PickDate.findByIdAndRemove(req.params.id, () => res.redirect("/profile"));
});

module.exports = cleanPickRoutes;
