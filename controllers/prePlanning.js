const PrePlanning = require("../models/PrePlanning");

exports.newPrePlanning = (req, res) => {
  const { location, subLocation, author, description } = req.body;
  const helpful = [];
  const notHelpful = [];
  const prePlanning = new PrePlanning({
    location,
    author,
    description,
    subLocation,
    helpful,
    notHelpful,
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

exports.helpfulPrePlanning = (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  console.log(userId + " " + postId);
  PrePlanning.updateOne(
    { _id: postId },
    {
      $addToSet: {
        helpful: {
          userId: userId,
        },
      },
    }
  )
    .then(async (data) => {
      res.status(200).json({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ status: "failed" });
    });
};
exports.removeHelpfulPrePlanning = (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  console.log(userId + " " + postId);
  PrePlanning.updateOne(
    { _id: postId },
    {
      $pull: {
        helpful: {
          userId: userId,
        },
      },
    }
  )
    .then(async (data) => {
      res.status(200).json({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ status: "failed" });
    });
};
exports.notHelpfulPrePlanning = (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  console.log(userId + " " + postId);
  PrePlanning.updateOne(
    { _id: postId },
    {
      $addToSet: {
        notHelpful: {
          userId: userId,
        },
      },
    }
  )
    .then(async (data) => {
      res.status(200).json({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ status: "failed" });
    });
};
exports.removeNotHelpfulPrePlanning = (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  console.log(userId + " " + postId);
  PrePlanning.updateOne(
    { _id: postId },
    {
      $pull: {
        notHelpful: {
          userId: userId,
        },
      },
    }
  )
    .then(async (data) => {
      res.status(200).json({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ status: "failed" });
    });
};
exports.getPrePlanningBySubLocation = (req, res) => {
  const subLocation = req.params.sublocation;
  PrePlanning.find({ subLocation: subLocation })
    .populate("author", "-password")
    .then((_subLocation) => {
      return res.status(200).json(_subLocation);
    })
    .catch((err) => {
      return res.status(440).json({ error: "Something went wrong" });
    });
};
