const express = require("express");
const {
  addTask,
  getStatusTask,
  completeSubLocationInTask,
  getTaskByID,
} = require("../controllers/task");
const { isAuthenticated } = require("../middleware/auth");
const {
  addTaskValidate,
  isTaskValidated,
  completeSubLocationInTaskValidate,
} = require("../validator/task");

const router = express.Router();

router.post(
  "/addTask",
  isAuthenticated,
  addTaskValidate,
  isTaskValidated,
  addTask
);
router.get("/getStatusTask/:id", isAuthenticated, getStatusTask);
router.post("/getTaskByID", isAuthenticated, getTaskByID);
router.post(
  "/completeSubLocationInTask",
  isAuthenticated,
  completeSubLocationInTaskValidate,
  isTaskValidated,
  completeSubLocationInTask
);

module.exports = router;
