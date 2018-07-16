require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');
// const Rating = require('../models/Rating');
// const PickDate = require('../models/PickDate');

//const dbName = process.env.DBURL
mongoose.connect('mongodb://localhost/toctoc',{useMongoClient:true});

const users = [
  {
    username: "annahogberg",
    password: "1234",
    email: "a@gmail.com",
    address: "Buganvilla 6",
    hours: "Morning",
    isToc: false,
    availability: false //req o no?
  },
  {
    username: "juan",
    password: "1234",
    email: "j@gmail.com",
    hours: "Afternoon",
    isToc: false,
    availability: false
  },
  {
    username: "paulagarcia",
    password: "1234",
    email: "p@gmail.com",
    address: "Chopera 14",
    hours: "Afternoon",
    isToc: true,
    availability: true,
    fee: 15
  },
  {
    username: "malmarc",
    password: "1234",
    email: "mm@gmail.com",
    hours: "Always",
    isToc: true,
    availability: true,
    fee: 10
  },
];

User.collection.drop();

User.create(users, (err, data) => {
  if (err) {throw (err)}
  console.log("User created")
  //mongoose.disconnect();
})