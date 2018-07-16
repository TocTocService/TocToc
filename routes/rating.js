const express = require("express");
const rating = express.Router();
const Rating = require("../models/Rating");

rating.use((req, res, next) => {
  if(req.user){
    next();
    return;
  }
  res.redirect('/');
})

rating.get('/rates', (req, res, next) => {
  let query;

  if(req.user.isToc){
    query = {cleaner: req.user._id}
  } else {
    query = {user: req.user._id}
  }

  Rating
    .find(query)
    .populate('user', 'name')
    .populate('cleaner', 'name')
    //.sort('pickupDate')
    .exec((err, pickupDocs) => {
      if (err) {
        next(err);
        return;
      }

      res.render('rates' , {
        pickups: pickupDocs
      });
  });

});

rating.post('/rates', (req, res, next) => {
  const userId = req.user._id;
  const rateInfo = {
    fee: req.body.fee,
    isLaunderer: true
  };

  User.findByIdAndUpdate(userId, rateInfo, (err, theUser) => {
    if (err) {
      next(err);
      return;
    }

    req.session.currentUser = theUser;

    res.redirect('/profile');
  });
});

module.exports = rating;