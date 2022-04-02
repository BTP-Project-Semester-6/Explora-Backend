const { check, validationResult } = require("express-validator");
const User = require("../models/User");

exports.userValidate = [
  check("username").notEmpty().withMessage("Please enter username"),
  check("name").notEmpty().withMessage("Please enter name"),
  check("age").notEmpty().withMessage("Please enter age"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Please enter password with length > 8"),
  // check("picUrl").notEmpty().withMessage("Please enter picture url"),
  check("gender").notEmpty().withMessage("Please enter gender"),
  check("email").isEmail().withMessage("Please enter valid email"),
  check("username").custom((value) => {
    return User.find({
      username: value,
    }).then((user) => {
      if (user.length > 0) {
        return Promise.reject("User with that username already exists");
      }
    });
  }),
  check("email").custom((value) => {
    return User.find({
      email: value,
    }).then((user) => {
      if (user.length > 0) {
        return Promise.reject("User with that email already exists");
      }
    });
  }),
];

exports.loginValidate = [
  check("username").notEmpty().withMessage("Please enter username"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Please enter password with length > 8"),
];

exports.quizValidate = [
  check("id").notEmpty().withMessage("Invalid user!"),
  check("id").custom((value) => {
    return User.findById(value)
      .then((user) => {
        if (user.quizAnswers !== undefined) {
          return Promise.reject("User has already given the quiz!");
        }
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  }),
];

exports.suggestFriendValidator = [
  check("id").custom((value) => {
    if (value == undefined) return Promise.reject("Please provide user id!");
    return User.findById(value).then((data, err) => {
      console.log(data);
      console.log(err);
      if (err) return Promise.reject(err);
      if (data.quizAnswers === undefined)
        return Promise.reject(
          "Please take the personality quiz to get access to this feature!"
        );
    });
  }),
];

exports.suggestPlacesValidator = [
  check("id").custom((value) => {
    if (value == undefined) return Promise.reject("Please provide user id!");
    return User.findById(value).then((data, err) => {
      console.log(data);
      console.log(err);
      if (err) return Promise.reject(err);
      if (data.quizAnswers === undefined)
        return Promise.reject(
          "Please take the personality quiz to get access to this feature!"
        );
    });
  }),
];

exports.isUserValidated = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  next();
};
