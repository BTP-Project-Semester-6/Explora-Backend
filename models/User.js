const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  picUrl: {
    type: String,
    default:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg",
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
    default: null,
  },
  posts: [
    {
      postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
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
    unique: true,
  },
  friends: [
    {
      friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  friendRequestSent: [
    {
      friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  friendRequestRecieved: [
    {
      friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  friendRequests: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  quizAnswers: {
    type: Array,
    default: undefined,
  },
});

module.exports = mongoose.model("User", userSchema);
