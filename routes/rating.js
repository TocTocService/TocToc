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
    .then(pickupDocs => {
      console.log(pickupDocs)
      res.render('rates' , {
        pickups: pickupDocs
      });
    })
    .catch( err => next(err))
    
      

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