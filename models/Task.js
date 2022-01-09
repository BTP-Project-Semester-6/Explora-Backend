const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  challengeID: { type: mongoose.Schema.Types.ObjectId, ref: "ChallengeSchema" },
  locations: [
    {
      name: { type: String, trim: true },
      lat: { type: String, trim: true },
      lng: { type: String, trim: true },
      competed: { type: Boolean, default: false },
    },
  ],
  competed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);
