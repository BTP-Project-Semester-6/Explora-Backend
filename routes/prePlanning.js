const express = require("express");
const {
  getPrePlanningBySubLocation,
  newPrePlanning,
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

module.exports = router;
