const { check, validationResult } = require("express-validator");

exports.ChallengeValidate = [
  check("city").notEmpty().withMessage("Please enter city"),
  check("badge").notEmpty().withMessage("Please enter badge"),
  check("name").notEmpty().withMessage("Please enter name"),
  check("description").notEmpty().withMessage("Please enter description"),
  check("location").notEmpty().withMessage("Please enter locations"),
];

exports.isChallengeValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
