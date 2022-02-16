const express = require("express");
const {
  getPrePlanningBySubLocation,
  newPrePlanning,
  helpfulPrePlanning,
  notHelpfulPrePlanning,
  removeHelpfulPrePlanning,
  removeNotHelpfulPrePlanning,
} = require("../controllers/prePlanning");
const {
  checkAddPrePlanning,
  isPrePlanningValidated,
} = require("../validator/prePlanning");

const router = express.Router();

router.get(
  "/getPrePlanningBySubLocation/:sublocation",
  getPrePlanningBySubLocation
);
router.post(
  "/newPrePlanning",
  checkAddPrePlanning,
  isPrePlanningValidated,
  newPrePlanning
);

router.post("/helpfulPrePlanning", helpfulPrePlanning);
router.post("/notHelpfulPrePlanning", notHelpfulPrePlanning);
router.post("/removeHelpfulPrePlanning", removeHelpfulPrePlanning);
router.post("/removeNotHelpfulPrePlanning", removeNotHelpfulPrePlanning);
module.exports = router;
