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
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/register",
  isAuthenticated,
  guideValidate,
  isGuideValidated,
  addGuide
);
router.get("/id/:id", isAuthenticated, getGuideById);
router.get("/location/:location", isAuthenticated, getGuideByLocation);

module.exports = router;
