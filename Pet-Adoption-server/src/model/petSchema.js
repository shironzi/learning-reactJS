const mongoose = require("mongoose");
const { Schema } = mongoose;

const petSchema = new Schema({
  id: {
    type: Number,
    autoIncrement: true,
    primary: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  animal: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Pet", petSchema);
