const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  roll: { type: String, unique: true },
  tryhackmeId: { type: String },
  passwod: { type: String },
  year: { type: String, required: true },
  rate: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema, "User");
