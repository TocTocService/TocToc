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

rating.get('/rates/:id', (req, res) => {
  User.findById(req.params.id).then(rate => {
    res.render('rates',{rate});
  });     
});

rating.post('/rates/:id', (req, res) => {
  const {speed, satisfaction, recommendation} = req.body;
  console.log(speed)
  console.log(recommendation)
  Rating.create({
    speed: {type: Number, enum: [1, 2, 3, 4, 5]},
    satisfaction: {type: Number, enum: [1, 2, 3, 4, 5]},
    recommendation: {type: String, enum: ["Yes", "No"]}
  })

  Rating.findByIdAndUpdate(req.params.id,{speed, satisfaction, recommendation})
  .then( rate => {
    res.redirect('/profile');
  });
});

module.exports = rating;