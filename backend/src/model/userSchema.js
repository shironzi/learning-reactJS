const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    required: false,
  },
  favoritePets: {
    type: [Schema.Types.ObjectId],
    ref: "Pet",
    required: false,
  },
  adoptionRequests: {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
