const { check, validationResult } = require("express-validator");
const User = require("../models/User");

exports.checkAddPrePlanning = [
  check("location").notEmpty().withMessage("Please enter location"),
  check("subLocation").notEmpty().withMessage("Please enter subLocation"),
  check("author").notEmpty().withMessage("Please enter author"),
  check("description").notEmpty().withMessage("Please enter description"),
  check("author").custom((value) => {
    return User.findById(value).then((user) => {
      if (user.length == 0) {
        return Promise.reject("User dose not exists");
      }
    });
  }),
];

exports.isPrePlanningValidated = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  next();
};
