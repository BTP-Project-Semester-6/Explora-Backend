const { check, validationResult } = require("express-validator");

exports.ChallengeValidate = [
  check("city").notEmpty().withMessage("Please enter city"),
  check("badge").notEmpty().withMessage("Please enter badge"),
  check("name").notEmpty().withMessage("Please enter name"),
  check("description").notEmpty().withMessage("Please enter description"),
  check("location.*.name")
    .not()
    .isEmpty()
    .withMessage("Please enter location name"),
  check("location.*.lat")
    .not()
    .isEmpty()
    .withMessage("Please enter location latitude"),
  check("location.*.lng")
    .not()
    .isEmpty()
    .withMessage("Please enter location longitude"),
];

exports.CityValidate =[
  check("city").notEmpty().withMessage("Please enter city"),
];

exports.isChallengeValidated = (req, res, next) => {
  const errors = validationResult(req);
  //   console.log(req.body);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
