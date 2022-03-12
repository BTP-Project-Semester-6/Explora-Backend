const express = require("express");
const {
  getPrePlanningBySubLocation,
  newPrePlanning,
  helpfulPrePlanning,
  notHelpfulPrePlanning,
  removeHelpfulPrePlanning,
  removeNotHelpfulPrePlanning,
} = require("../controllers/prePlanning");
const { isAuthenticated } = require("../middleware/auth");
const {
  checkAddPrePlanning,
  isPrePlanningValidated,
} = require("../validator/prePlanning");

const router = express.Router();

router.get(
  "/getPrePlanningBySubLocation/:sublocation",
  isAuthenticated,
  getPrePlanningBySubLocation
);
router.post(
  "/newPrePlanning",
  isAuthenticated,
  checkAddPrePlanning,
  isPrePlanningValidated,
  newPrePlanning
);

router.post("/helpfulPrePlanning", isAuthenticated, helpfulPrePlanning);
router.post("/notHelpfulPrePlanning", isAuthenticated, notHelpfulPrePlanning);
router.post(
  "/removeHelpfulPrePlanning",
  isAuthenticated,
  removeHelpfulPrePlanning
);
router.post(
  "/removeNotHelpfulPrePlanning",
  isAuthenticated,
  removeNotHelpfulPrePlanning
);
module.exports = router;
