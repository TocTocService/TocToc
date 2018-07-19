const express = require("express");
const profile = express.Router();
const PickDate = require("../models/PickDate");
const User = require("../models/User");
const Rating = require("../models/Rating");
const uploadCloud = require("../config/cloudinary.js");

// Poner servicios en perfil/historial
profile.get("/profile", (req, res, next) => {
  let query;

  if (req.user.isToc) {
    query = { cleaner: req.user._id };
  } else {
    query = { user: req.user._id };
  }

  let totalRate = 0;
  let hasVoted = false;

  Rating
  .find(query)
  .then( data => {
    if ( data.length > 0){
      hasVoted = true
    }
    data.forEach((e) => {
      totalRate += Math.floor((e.speed + e.satisfaction) / (data.length * 2));
      return totalRate;
    })
  })
 
  PickDate
  .find(query)
  .populate('user')
  .populate('cleaner')
  .sort('serviceDate')
  .then(services => {
    res.render('userpage/profile', {services, totalRate, hasVoted})
  })
  .catch(err => console.log(err));
});

// Editar datos profile
profile.get("/edit/:id", (req, res) => {
  User.findById(req.params.id).then(user => {
    res.render("userpage/edit", { user });
  });
});

profile.post("/edit/:id", uploadCloud.single('photo'), (req, res) => {
  const fee = req.body.fee ? req.body.fee : 0;
  const avatarPath = req.file.url;
  const avatarName = req.file.photo;
  const { username, name, email, address, description} = req.body;
  User.findByIdAndUpdate(req.params.id, {
    username,
    name,
    email,
    address,
    description,
    avatarName,
    avatarPath,
    fee
  }).then(user => {
    res.redirect("/profile");
  });
});

// confirmar servicio desde cleaner
profile.get("/confirm/:id", (req, res, next) => {
  let confirmId = req.params.id;

  PickDate.findOneAndUpdate(
    { _id: confirmId },
    { confirm: "Confirmado" },
    { new: true }
  )
    .then(user => {
      res.redirect("/profile");
    })
    .catch(err => {
      console.log(err);
    });
});

profile.get('/public/:id', (req, res, next) =>{
  let id = req.params.id;
  let query;// Esto está repetido en la vista de profile OJO
  
  if (req.user.isToc) {
    query = { cleaner: req.user._id };
  } else {
    query = { user: req.user._id };
  }

  let totalRate = 0; 

  Rating
  .find(query)
  .then( data => {
    data.forEach((e) => {
      totalRate += Math.floor((e.speed + e.satisfaction) / (data.length * 2));
      return totalRate;
    })
  })

  User.findById(id)
  .then(ficha => {
    res.render("userpage/public", {ficha, totalRate});
  })
  .catch((err)=> {
    console.log(err);
  })
});

// confirmar servicio desde cleaner
profile.get("/reject/:id", (req, res, next) => {
  let confirmId = req.params.id;

  PickDate.findOneAndUpdate(
    { _id: confirmId },
    { confirm: "Rechazado" },
    { new: true }
  )
    .then(user => {
      res.redirect("/profile");
    })
    .catch(err => {
      console.log(err);
    });
});


module.exports = profile;
