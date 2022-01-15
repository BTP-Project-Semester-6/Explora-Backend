const express = require("express");
const { visitingPlace } = require("../controllers/visitingPlace");

const router = express.Router();

router.get("/places", visitingPlace);

module.exports = router;
