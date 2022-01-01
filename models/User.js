const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  picUrl: {
    type: String,
  },
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
  guideId: {
    type: String,
    default: null,
  },
  posts: [
    {
      type: String,
    },
  ],
  travelHistory: [
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
  badges: [
    {
      type: String,
    },
  ],
  telegram: {
    type: String,
  },
  instagram: {
    type: String,
  },
  email: {
    type: String,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
