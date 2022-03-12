const mongoose = require("mongoose");

const buddySchema = mongoose.Schema({
  groupMaxSize: { type: Number, trim: true },
  city: { type: String, trim: true },
  dateOfArrival: { type: String, trim: true },
  dateOfDeparture: { type: String, trim: true },
  description: { type: String, trim: true },
  Host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  inGroup: [
    {
      username: { type: String, trim: true },
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  requests: [
    {
      username: { type: String, trim: true },
      similarity: { type: "String" },
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

module.exports = mongoose.model("Buddy", buddySchema);
