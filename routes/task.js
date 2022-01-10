const express = require("express");
const {
  addTask,
  getStatusTask,
  completeSubLocationInTask,
} = require("../controllers/task");
const { addTaskValidate, isTaskValidated } = require("../validator/task");

const router = express.Router();

router.post("/addTask", addTaskValidate, isTaskValidated, addTask);
router.get("/getStatusTask/:id", getStatusTask);
router.post("/completeSubLocationInTask", completeSubLocationInTask);

module.exports = router;
