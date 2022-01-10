const challenge = require("../models/challenge");
const Task = require("../models/Task");

exports.addTask = (req, res) => {
  Task.findOne(
    { userId: req.body.userId, challengeID: req.body.challengeID },
    function (err, result) {
      if (err) {
        return res.status(400).send({ message: "Something Went Wrong" });
      } else if (!result) {
        challenge
          .findOne({
            _id: req.body.challengeID,
          })
          .then((challengeData) => {
            console.log(challengeData);
            const newLocations = challengeData.locations.map((item) => {
              const loc = {};
              loc["name"] = item.name;
              loc["lat"] = item.lat;
              loc["lng"] = item.lng;
              loc["competed"] = false;
              return loc;
            });
            const newTask = new Task({
              userId: req.body.userId,
              challengeID: req.body.challengeID,
              locations: newLocations,
              competed: false,
            });
            newTask.save((error, data) => {
              if (error) {
                console.log(error);
                return res.status(400).json({ error: "Adding Task Failed" });
              }
              if (data) {
                return res.status(200).json({
                  message: "Success",
                });
              }
            });
          });
      } else {
        return res.status(400).send({ message: "Task already active!!!" });
      }
    }
  );
};
