const User = require("../models/User");
const Guide = require("../models/Guide");
const mongoose = require("mongoose");

exports.addGuide = (req, res) => {
  const newGuide = new Guide({
    userId: req.body.user_id,
    location: req.body.location,
    sublocation: req.body.sublocation,
    pastGuideExperiences: [],
    rate: req.body.rate,
    experience: req.body.experience,
  });
  newGuide.save().then((data, err) => {
    if (err !== undefined) {
      return res.status(400).send({ message: "Adding guide failed" });
    }
    User.findByIdAndUpdate(
      data.userId,
      {
        guideId: mongoose.Types.ObjectId(data._id),
      },
      (err, user) => {
        console.log(err);
        console.log(user);
        if (!user) {
          return res.status(400).send({ message: "Adding guide failed..." });
        }
        return res
          .status(200)
          .send({ message: "Successfully registered guide" });
      }
    );
  });
};
