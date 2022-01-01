const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
  city: { type: String, unique: 1, trin: true },
  badge: { type: String, trim: true },
  name: { type: String, trim: true },
  description: { type: String, trim: true },
  locations: [
    {
      name: { type: String, trim: true },
      latitude: { type: String, trim: true },
      longitude: { type: String, trim: true },
    },
  ],
});

module.exports = mongoose.model("ChallengeSchema", challengeSchema);
