const express = require("express");
const { addTask } = require("../controllers/task");

const router = express.Router();

router.post("/addTask", addTask);

module.exports = router;
