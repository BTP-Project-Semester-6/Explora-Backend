const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  location: { type: String, trim: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  photoUrl: { type: String, trim: true },
  description: { type: String, trim: true },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: String, trim: true },
      commentString: { type: String, trim: true },
      created_at: { type: Date, default: Date.now },
    },
  ],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
