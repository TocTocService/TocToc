const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    cleaner: {type: Schema.Types.ObjectId, ref: 'User'},
    speed: {type: Number, enum: [1, 2, 3, 4, 5]},
    satisfaction: {type: Number, enum: [1, 2, 3, 4, 5]},
    recommendation: {type: String, enum: ["Yes", "No"]}
  });

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
