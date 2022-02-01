const { check, validationResult } = require("express-validator");
const req = require("express/lib/request");
const Buddy = require("../models/Buddy");

exports.buddyCreateGroupValidate = [
  check("groupMaxSize").notEmpty().withMessage("Error: Group Max Size"),
  check("description").notEmpty().withMessage("Error: Description"),
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
  check("username").notEmpty().withMessage("Error: Username"),
];

exports.buddyRemoveValidate = [
  check("groupId").notEmpty().withMessage("Error: Group Id"),
  check("id").notEmpty().withMessage("Error: Personal Id"),
  check("username").notEmpty().withMessage("Error: Username"),
];

exports.getBuddyByCityValidate = [
  check("city").notEmpty().withMessage("Error: City"),
];

exports.buddyRequestValidate = [
  check("groupId").notEmpty().withMessage("Error: Group Id"),
  check("id").notEmpty().withMessage("Error: Personal Id"),
  check("username").notEmpty().withMessage("Error: Username"),
  check("groupId").custom((value) => {
    Buddy.findById(value)
      .then((group) => {
        console.log(group);
        const grpMember = group.inGroup;
        console.log(grpMember);
        console.log("###");
        for (const member in grpMember) {
          console.log(grpMember[member]);
          console.log(req);
          if (grpMember[member].username === req.body.username)
            return Promise.reject("Given user is already in the buddy group!");
        }
        console.log(resSet);
        // if (user.username !== req.body.username) {
        //   return Promise.reject("Given username doesn't match with original!");
        // }
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject("Invalid Group!");
      });
  }),
];

exports.isBuddyValidated = (req, res, next) => {
  const errors = validationResult(req);
  //   console.log(req.body);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
