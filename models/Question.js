const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionNo: { type: Number, required: [true, "Question no. is required"] },
  submittedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  answer: { type: String, required: [true, "Answer is required"] },
});

module.exports = mongoose.model("Question", questionSchema);
