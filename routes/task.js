const express = require("express");
const {
  addTask,
  getStatusTask,
  completeSubLocationInTask,
  getTaskByID,
} = require("../controllers/task");
const {
  addTaskValidate,
  isTaskValidated,
  completeSubLocationInTaskValidate,
} = require("../validator/task");

const router = express.Router();

router.post("/addTask", addTaskValidate, isTaskValidated, addTask);
router.get("/getStatusTask/:id", getStatusTask);
router.post("/getTaskByID", getTaskByID);
router.post(
  "/completeSubLocationInTask",
  completeSubLocationInTaskValidate,
  isTaskValidated,
  completeSubLocationInTask
);

module.exports = router;
