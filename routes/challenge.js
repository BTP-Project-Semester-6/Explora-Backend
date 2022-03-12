const express = require("express");
const { model } = require("mongoose");
const {
  newChallenge,
  getChallengeByCity,
  getAdminAllNotValidCity,
  validateChallenge,
  removeChallenge,
} = require("../controllers/challenge");
const { isAuthenticated } = require("../middleware/auth");
const {
  isChallengeValidated,
  ChallengeValidate,
  CityValidate,
  ChallengeIdValidate,
} = require("../validator/challenge");
const router = express.Router();

router.post(
  "/newChallenge",
  isAuthenticated,
  ChallengeValidate,
  isChallengeValidated,
  newChallenge
);

router.post(
  "/getChallengeByCity",
  isAuthenticated,
  CityValidate,
  isChallengeValidated,
  getChallengeByCity
);

router.post(
  "/getAdminAllNotValidCity",
  isAuthenticated,
  getAdminAllNotValidCity
);

router.post(
  "/validateChallenge",
  isAuthenticated,
  ChallengeIdValidate,
  isChallengeValidated,
  validateChallenge
);

router.post(
  "/removeChallenge",
  isAuthenticated,
  ChallengeIdValidate,
  isChallengeValidated,
  removeChallenge
);

module.exports = router;
