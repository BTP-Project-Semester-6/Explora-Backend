const express = require("express");
const { addTask, getStatusTask } = require("../controllers/task");
const { addTaskValidate, isTaskValidated } = require("../validator/task");

const router = express.Router();

router.post("/addTask", addTaskValidate, isTaskValidated, addTask);
router.get("/getStatusTask/:id", getStatusTask);

module.exports = router;
