const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
  city: { type: String, trim: true },
  badge: { type: String, trim: true },
  name: { type: String, trim: true, unique: 1 },
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
