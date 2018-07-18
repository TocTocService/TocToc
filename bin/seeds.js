require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const dbName = process.env.DBURL
mongoose.connect(dbName,{useMongoClient:true});

const salt = bcrypt.genSaltSync(10);
const hashPass = bcrypt.hashSync('1234', salt);

const users = [
  {
    username: "annahogberg",
    name: "Anna",
    password: hashPass,
    email: "a@gmail.com",
    address: "Buganvilla 6",
    isToc: false,
    availability: false //req o no?
  },
  {
    username: "juan",
    name: "Juan",
    password: hashPass,
    email: "j@gmail.com",
    isToc: false,
    availability: false
  },
  {
    username: "paulagarcia",
    name: "Paula",
    password: hashPass,
    email: "p@gmail.com",
    address: "Chopera 14",
    isToc: true,
    availability: true,
    fee: 15
  },
  {
    username: "malmarc",
    name: "Marc",
    password: hashPass,
    email: "mm@gmail.com",
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