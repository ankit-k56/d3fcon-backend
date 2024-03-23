const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Use _id for MongoDB's internal identifier
  questionNo: { type: Number, required: true },
  submittedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user ObjectIds referencing User model
  answer: { type: String },
});

module.exports = mongoose.model("Question", questionSchema);
