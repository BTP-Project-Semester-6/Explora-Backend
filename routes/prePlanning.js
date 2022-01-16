const express = require("express");
const {
  getPrePlanningBySubLocation,
  newPrePlanning,
} = require("../controllers/prePlanning");

const router = express.Router();

router.get(
  "/getPrePlanningBySubLocation/:sublocation",
  getPrePlanningBySubLocation
);
router.post("/newPrePlanning", newPrePlanning);

module.exports = router;
