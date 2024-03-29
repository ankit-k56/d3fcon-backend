const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exists"],
  },
  level: {
    type: Number,
    default: 1,
  },
  score: {
    type: Number,
    default: 0,
  },
  currentQuest: {
    type: Number,
    default: 1,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isStorySeen: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Player", playerSchema, "Player");
