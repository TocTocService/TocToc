const express = require("express");
const profile = express.Router();
const PickDate = require("../models/PickDate");
const User = require('../models/User');

profile.get('/profile', (req, res, next) => {
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

profile.get('/edit', (req, res, next) =>{
  res.render('userpage/edit');
});

profile.get('/confirm/:id', (req, res, next) =>{
  let confirmId = req.params.id;

  

  PickDate.findOneAndUpdate({_id: confirmId}, {confirm:true}, {new:true}).then(user => {
    res.redirect("/profile");
  })
  .catch((err)=> {
    console.log(err);
  })
});

module.exports = profile;
