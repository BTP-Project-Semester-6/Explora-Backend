const { check, validationResult } = require("express-validator");

exports.PostValidate = [
  check("location").notEmpty().withMessage("Please enter location"),
  check("author").notEmpty().withMessage("Please enter author"),
  check("photoUrl").notEmpty().withMessage("Please enter photoUrl"),
  check("description").notEmpty().withMessage("Please enter description"),
  check("likes").isArray().withMessage("Please enter likes array"),
  check("comment")
  .isArray()
    .withMessage("Please enter comment array"),
  
];

exports.isPostValidated = (req, res, next) => {
  const errors = validationResult(req);
  //   console.log(req.body);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
