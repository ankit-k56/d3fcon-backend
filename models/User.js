const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: { type: String },
  currentQuest: { type: Number },
  score: { type: Number },
  level: { type: Number },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  roll: { type: String, unique: true },
  tryhackmeId: { type: String },
  year: { type: String, required: true },
  rate: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema, "User");
