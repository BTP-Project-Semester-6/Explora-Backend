const express = require("express");
const router = express.Router();

const {
  createGroup,
  deleteGroup,
  addBuddy,
  removeBuddy,
} = require("../controllers/buddy");

const {
  buddyCreateGroupValidate,
  buddyDeleteGroupValidate,
  buddyAddValidate,
  buddyRemoveValidate,
  isBuddyValidated,
} = require("../validator/buddy");

const { isAuthenticated } = require("../middleware/auth");

router.post(
  "/createGroup",
  buddyCreateGroupValidate,
  isBuddyValidated,
  isAuthenticated,
  createGroup
);
router.post(
  "/deleteGroup",
  buddyDeleteGroupValidate,
  isBuddyValidated,
  deleteGroup
);
router.post("/addBuddy", buddyAddValidate, isBuddyValidated, addBuddy);
router.post("/removeBuddy", buddyRemoveValidate, isBuddyValidated, removeBuddy);

module.exports = router;
