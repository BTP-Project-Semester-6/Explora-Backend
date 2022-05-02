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
  getUserBuddyGroups,
  getAllBuddy,
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
  isAuthenticated,
  createGroup
);
router.post(
  "/deleteGroup",
  isAuthenticated,
  buddyDeleteGroupValidate,
  isBuddyValidated,
  deleteGroup
);
router.post("/addBuddy", buddyAddValidate, isBuddyValidated, addBuddy);
router.post("/removeBuddy", buddyRemoveValidate, isBuddyValidated, removeBuddy);
router.post(
  "/getBuddybyCity",
  isAuthenticated,
  getBuddyByCityValidate,
  isBuddyValidated,
  getBuddyByCity
);

router.post("/getAllBuddy", isAuthenticated, getAllBuddy);

router.post(
  "/addbuddyrequest",
  isAuthenticated,
  buddyRequestValidate,
  isBuddyValidated,
  addBuddyRequest
);

router.get("/getbuddysimilarity/:id", isAuthenticated, getBuddySimilarity);

router.get("/userbuddies/:id", isAuthenticated, getUserBuddyGroups);

module.exports = router;
