const express = require("express");
const {
  guideValidate,
  isGuideValidated,
} = require("../validator/guide.validator");

const { addGuide } = require("../controllers/guide.controller");

const router = express.Router();

router.post("/register", guideValidate, isGuideValidated, addGuide);

module.exports = router;
