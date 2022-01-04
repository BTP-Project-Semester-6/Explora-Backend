const express = require("express");
const {
  guideValidate,
  isGuideValidated,
} = require("../validator/guide.validator");

const {
  addGuide,
  getGuideById,
  getGuideByLocation,
} = require("../controllers/guide.controller");

const router = express.Router();

router.post("/register", guideValidate, isGuideValidated, addGuide);
router.get("/id/:id", getGuideById);
router.get("/location/:location", getGuideByLocation);

module.exports = router;
