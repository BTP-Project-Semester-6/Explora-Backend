const express = require("express");
const { model } = require("mongoose");
const { newChallenge } = require("../controllers/challenge");
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

module.exports = router;
