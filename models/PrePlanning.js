const mongoose = require("mongoose");

const prePlanningSchema = mongoose.Schema({
  location: { type: String, trim: true },
  subLocation: { type: String, trim: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: { type: String, trim: true },
});

module.exports = mongoose.model("PrePlanning", prePlanningSchema);
