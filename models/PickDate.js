const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pickDateSchema = new Schema({
  serviceDate: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  cleaner: { type: Schema.Types.ObjectId, ref: 'User' },
  confirm: {type: Boolean, default: false}
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

//pickDateSchema.set('timestamps', true); //createdAt, updatedAt

const pickDate = mongoose.model('pickDate', pickDateSchema);

module.exports = pickDate;