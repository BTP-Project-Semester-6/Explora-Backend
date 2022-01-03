const { check, validationResult } = require("express-validator");

exports.buddyCreateGroupValidate = [
  check("groupMaxSize").notEmpty().withMessage("Error: Group Max Size"),
  check("city").notEmpty().withMessage("Error: City"),
  check("dateOfArrival").notEmpty().withMessage("Error: dateOfArrival"),
  check("dateOfDeparture").notEmpty().withMessage("Error: dateOfDeparture"),
  check("Host").notEmpty().withMessage("Error: Host"),
];

exports.buddyDeleteGroupValidate = [
  check("groupId").notEmpty().withMessage("Error: Group Id"),
  check("myId").notEmpty().withMessage("Error: Personal Id"),
];

exports.buddyAddValidate = [
  check("groupId").notEmpty().withMessage("Error: Group Id"),
  check("id").notEmpty().withMessage("Error: Personal Id"),
  check("name").notEmpty().withMessage("Error: Personal Name"),
];

exports.buddyRemoveValidate = [
  check("groupId").notEmpty().withMessage("Error: Group Id"),
  check("id").notEmpty().withMessage("Error: Personal Id"),
  check("name").notEmpty().withMessage("Error: Personal Name"),
];

exports.isBuddyValidated = (req, res, next) => {
  const errors = validationResult(req);
  //   console.log(req.body);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
