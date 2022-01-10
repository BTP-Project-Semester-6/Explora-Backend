const express = require("express");
const { addTask } = require("../controllers/task");
const { addTaskValidate, isTaskValidated } = require("../validator/task");

const router = express.Router();

router.post("/addTask", addTaskValidate, isTaskValidated, addTask);

module.exports = router;
