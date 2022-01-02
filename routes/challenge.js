const express = require("express");
const { model } = require("mongoose");
const {
  newChallenge,
  getChallengeByCity,
} = require("../controllers/challenge");
const {
  isChallengeValidated,
  ChallengeValidate,
} = require("../validator/challenge");
const router = express.Router();

router.post(
  "/newChallenge",
  ChallengeValidate,
  isChallengeValidated,
  newChallenge
);

router.get("/getChallengeByCity", getChallengeByCity);

module.exports = router;
