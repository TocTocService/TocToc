require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const dbName = process.env.DBURL2
mongoose.connect(dbName,{useMongoClient:true});

const salt = bcrypt.genSaltSync(10);
const hashPass = bcrypt.hashSync('1234', salt);

const users = [
  {
    username: "annahogberg",
    name: "Anna",
    password: hashPass,
    email: "a@gmail.com",
    address: "Calle Buganvilla, 6. Madrid",
    isToc: false,
    description,
    avatarName,
    avatarPath
  },
  {
    username: "Juan",
    name: "Paquita",
    password: hashPass,
    email: "j@gmail.com",
    isToc: false,
    description: "Me encanta que venga a organizar mi casa un especialista",
    avatarName,
    avatarPath
  },
  {
    username: "paulagarcia",
    name: "Paula",
    password: hashPass,
    email: "p@gmail.com",
    isToc: true,
    fee: 15,
    description: "Hola! Soy Paula y tengo un TOC diagnosticado. Esta nueva app me ha dado la oportunidad de paliar mi ansiedad a la vez que ahorro. Se puede pedir más? :-) Estaré encantada de limpiar y ordenar tu casa",
    avatarName,
    avatarPath
  },
  {
    username: "malmarc",
    name: "Marc",
    password: hashPass,
    email: "mm@gmail.com",
    isToc: true,
    fee: 20,
    description,
    avatarName,
    avatarPath
  },
];

User.collection.drop();

User.create(users, (err, data) => {
  if (err) {throw (err)}
  console.log("User created")
  //mongoose.disconnect();
})