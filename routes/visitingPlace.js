const express = require("express");
const { visitingPlace } = require("../controllers/visitingPlace");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/places", isAuthenticated, visitingPlace);

module.exports = router;
