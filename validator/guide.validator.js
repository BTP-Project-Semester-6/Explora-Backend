const { check, validationResult } = require("express-validator");
const User = require("../models/User");

exports.guideValidate = [
  check("user_id").notEmpty().withMessage("Please give user id"),
  check("location").notEmpty().withMessage("Please enter location"),
  check("rate").notEmpty().withMessage("Please enter rate"),
  check("experience").notEmpty().withMessage("Please enter experience"),
  check("user_id").custom((value) => {
    return User.findById(value)
      .then((user) => {
        if (user) {
          if (user.guideId !== null) {
            return Promise.reject("Given user is already a guide");
          }
        } else {
          return Promise.reject("No user with that id exists");
        }
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  }),
];

exports.isGuideValidated = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  next();
};
