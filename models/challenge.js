const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
  city: { type: String, unique: 1, trim: true },
  badge: { type: String, trim: true },
  name: { type: String, trim: true },
  description: { type: String, trim: true },
  locations: [
    {
      name: { type: String, trim: true },
      lat: { type: String, trim: true },
      lng: { type: String, trim: true },
    },
  ],
});

module.exports = mongoose.model("ChallengeSchema", challengeSchema);
