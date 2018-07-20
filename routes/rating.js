const express = require("express");
const rating = express.Router();
const Rating = require("../models/Rating");
const User = require("../models/User");

rating.use((req, res, next) => {
  if(req.user){
    next();
    return;
  }
  res.redirect('/');
})

rating.get('/rates/:id', (req, res) => {
  User.findById(req.params.id).then(cleaner => {
    res.render('rates',{cleaner});
  });     
});

rating.post('/rates/:id', (req, res) => {
  const {speed, satisfaction, recommendation} = req.body;
  const cleaner = req.params.id;
  const user = req.user._id;

  Rating.create({
    cleaner,
    user,
    speed,
    satisfaction,
    recommendation
  })
  .then(() => {
    res.redirect('/profile');
  })
  .catch((err) =>{
    console.log(err);
  })

});

module.exports = rating;



