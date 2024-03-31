const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    roll: { type: String, unique: true },
    tryhackmeId: { type: String },
    password: { type: String },
    year: { type: String, required: true },
    rate: { type: String, required: true },
    isEventAttended: { type: Boolean, default: false },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
