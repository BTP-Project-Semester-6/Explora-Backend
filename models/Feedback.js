const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  subject: { type: String, trim: true },
  description: { type: String, trim: true },
  rating: { type: Number, trim: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
