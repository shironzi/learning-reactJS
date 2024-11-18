const mongoose = require("mongoose");

const { Schema } = mongoose;

const adoptionData = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("AdoptionData", adoptionData);
