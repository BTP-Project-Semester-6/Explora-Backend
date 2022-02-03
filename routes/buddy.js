const express = require("express");
const router = express.Router();

const {
  createGroup,
  deleteGroup,
  addBuddy,
  removeBuddy,
  getBuddyByCity,
  addBuddyRequest,
  getBuddySimilarity,
} = require("../controllers/buddy");

const {
  buddyCreateGroupValidate,
  buddyDeleteGroupValidate,
  buddyAddValidate,
  buddyRemoveValidate,
  isBuddyValidated,
  getBuddyByCityValidate,
  buddyRequestValidate,
} = require("../validator/buddy");

const { isAuthenticated } = require("../middleware/auth");

router.post(
  "/createGroup",
  buddyCreateGroupValidate,
  isBuddyValidated,
  // isAuthenticated,
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
router.post(
  "/addbuddyrequest",
  buddyRequestValidate,
  isBuddyValidated,
  addBuddyRequest
);

router.get("/getbuddysimilarity/:id", getBuddySimilarity);

module.exports = router;
