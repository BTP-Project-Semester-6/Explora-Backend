const express = require("express");
const { model } = require("mongoose");
const {
  newChallenge,
  getChallengeByCity,
} = require("../controllers/challenge");
const {
  isChallengeValidated,
  ChallengeValidate,
  CityValidate,
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

module.exports = router;
