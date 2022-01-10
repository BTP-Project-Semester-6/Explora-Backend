const { check, validationResult } = require("express-validator");
const Task = require("../models/Task");
const User = require("../models/User");

exports.addTaskValidate = [
  check("userId").notEmpty().withMessage("Please give user id"),
  check("challengeID").notEmpty().withMessage("Please give challenge id"),
];
exports.isTaskValidated = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  next();
};
