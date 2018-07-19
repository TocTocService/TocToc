const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pickDateSchema = new Schema({
  serviceDate: {type: String, required:true},
  serviceTime: {type: String, required:true},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  cleaner: { type: Schema.Types.ObjectId, ref: 'User' },
  confirm: {type: String, enum: ["Confirmado", "Pendiente", "Rechazado"], default: "Pendiente"}
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