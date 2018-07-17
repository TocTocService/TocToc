const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    address: {type: String},
    isToc: {type: Boolean, default: false},
    availability: {type: Boolean, default: true},
    fee: { type: Number, default: null },
    description: {type: String}
  });

const User = mongoose.model("User", userSchema);

module.exports = User;
