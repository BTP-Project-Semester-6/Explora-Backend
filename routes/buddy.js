const express = require("express");
const router = express.Router();

const {
  createGroup,
  deleteGroup,
  addBuddy,
  removeBuddy,
  getBuddyByCity,
} = require("../controllers/buddy");

const {
  buddyCreateGroupValidate,
  buddyDeleteGroupValidate,
  buddyAddValidate,
  buddyRemoveValidate,
  isBuddyValidated,
  getBuddyByCityValidate,
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
router.post(
  "/getBuddybyCity",
  getBuddyByCityValidate,
  isBuddyValidated,
  getBuddyByCity
);

module.exports = router;
