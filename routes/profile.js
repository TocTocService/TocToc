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
  
  //console.log(query)

  PickDate
  .find(query)
  .populate('user')
  .populate('cleaner')
  .sort('serviceDate')
  .then(services => res.render('userpage/profile', {services}))
  .catch(err => console.log(err));
});

// Editar datos profile
profile.get('/edit/:id', (req, res) =>{
  User.findById(req.params.id).then(user => {
    res.render('userpage/edit',{user});
  });
});

profile.post('/edit/:id', (req, res) => {
  const fee = req.body.fee ? req.body.fee : 0;
  const {username, name, email, address} = req.body;
  User.findByIdAndUpdate(req.params.id,{username, name, email, address, fee})
  .then( user => {
    res.redirect('/profile');
  });
})

module.exports = profile;
