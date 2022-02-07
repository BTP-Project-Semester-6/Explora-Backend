const express = require("express");
const { model } = require("mongoose");
const {
  newChallenge,
  getChallengeByCity,
  getAdminAllNotValidCity,
  validateChallenge,
  removeChallenge,
} = require("../controllers/challenge");
const {
  isChallengeValidated,
  ChallengeValidate,
  CityValidate,
  ChallengeIdValidate,
} = require("../validator/challenge");
const router = express.Router();

router.post(
  "/newChallenge",
  ChallengeValidate,
  isChallengeValidated,
  newChallenge
);

router.post(
  "/getChallengeByCity",
  CityValidate,
  isChallengeValidated,
  getChallengeByCity
);

router.post("/getAdminAllNotValidCity", getAdminAllNotValidCity);

router.post(
  "/validateChallenge",
  ChallengeIdValidate,
  isChallengeValidated,
  validateChallenge
);

router.post(
  "/removeChallenge",
  ChallengeIdValidate,
  isChallengeValidated,
  removeChallenge
);

module.exports = router;
