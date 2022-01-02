const mongoose = require("mongoose");

const guideSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  location: {
    type: String,
  },
  sublocation: [
    {
      name: {
        type: String,
      },
      lat: {
        type: String,
      },
      lng: {
        type: String,
      },
    },
  ],
  pastGuideExperiences: [
    {
      rating: {
        type: Number,
      },
      review: {
        type: String,
      },
      givenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  rate: {
    type: String,
  },
  experience: {
    type: Number,
  },
});

module.exports = mongoose.Schema("Guide", guideSchema);
