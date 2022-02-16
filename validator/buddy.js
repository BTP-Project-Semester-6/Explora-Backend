const { check, validationResult } = require("express-validator");
const req = require("express/lib/request");
const Buddy = require("../models/Buddy");
const User = require("../models/User");

exports.buddyCreateGroupValidate = [
  check("groupMaxSize").notEmpty().withMessage("Group Max Size not provided"),
  check("description").notEmpty().withMessage("Description  not provided"),
  check("city").notEmpty().withMessage("City not provided"),
  check("dateOfArrival").notEmpty().withMessage("DateOfArrival not provided"),
  check("dateOfDeparture")
    .notEmpty()
    .withMessage("DateOfDeparture not provided"),
  // check("HostId").custom((value) => {
  //   console.log("idval", value);
  //   return User.findById(value)
  //     .then((user, err) => {
  //       console.log(user);
  //       console.log("asd", err);
  //       if (user.quizAnswers === undefined) {
  //         return Promise.reject("User has not given the personality quiz!");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("1", err);
  //       return Promise.reject(err);
  //     });
  // }),
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
  check("id").custom((value, { req }) => {
    return User.findById(value)
      .then((user, err) => {
        console.log(user);
        console.log(err);
        if (user == undefined) {
          return Promise.reject("No user found!");
        }
        if (user.username !== req.body.username) {
          return Promise.reject("Invalid Username for user id!");
        }
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  }),
  check("groupId").custom((value, { req }) => {
    console.log("asd", req.body);
    return Buddy.findById(value)
      .then((group) => {
        console.log(group);
        const grpMember = group.inGroup;
        console.log(grpMember);
        console.log("###");
        for (const member in grpMember) {
          console.log(grpMember[member]);
          // console.log(req);
          if (grpMember[member].username === req.body.username)
            return Promise.reject("Given user is already in the buddy group!");
        }
        const requestArr = group.requests;
        for (const reqElement in requestArr) {
          if (requestArr[reqElement].username === req.body.username)
            return Promise.reject(
              "Given user has already requested to get added in this group!"
            );
        }
        // console.log(resSet);
        // if (user.username !== req.body.username) {
        //   return Promise.reject("Given username doesn't match with original!");
        // }
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  }),
];

exports.isBuddyValidated = (req, res, next) => {
  const errors = validationResult(req);
  //   console.log(req.body);
  console.log("#######################");
  console.log("2", errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
