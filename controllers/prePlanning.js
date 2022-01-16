const PrePlanning = require("../models/PrePlanning");

exports.newPrePlanning = (req, res) => {
  const { location, subLocation, author, description } = req.body;

  const prePlanning = new PrePlanning({
    location,
    author,
    description,
    subLocation,
  });

  prePlanning.save((error, data) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error: "Adding prePlanning Failed" });
    }

    if (data) {
      return res.status(200).json({
        message: "Success",
      });
    }
  });
};

exports.getPrePlanningBySubLocation = (req, res) => {
  const subLocation = req.params.sublocation;
  PrePlanning.find({ subLocation: subLocation })
    .then((_subLocation) => {
      return res.status(200).json(_subLocation);
    })
    .catch((err) => {
      return res.status(440).json({ error: "Something went wrong" });
    });
};
