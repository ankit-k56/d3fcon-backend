const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionNo: { type: Number, required: true },
  submittedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  answer: { type: String, required: true },
});

module.exports = mongoose.model("Question", questionSchema);
