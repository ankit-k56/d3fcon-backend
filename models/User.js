const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Use _id for MongoDB's internal identifier
  userName: { type: String },
  currentQuest: { type: Number }, // Optional fields can be marked as such
  score: { type: Number },
  level: { type: Number },
  name: { type: String },
  email: { type: String, required: true, unique: true }, // Make email required and unique
  phone: { type: String, required: true },
  roll: { type: String, unique: true }, // Make roll unique
  tryhackmeId: { type: String },
  year: { type: String, required: true },
  rate: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
