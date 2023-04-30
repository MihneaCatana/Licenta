const express = require("express");
const router = express.Router();
const TaskController = require("../controller").task;

router.post("/create", TaskController.createTask);

router.get("/", TaskController.getAllTasks);

router.get("/:id", TaskController.getTaskById);

router.put("/:id", TaskController.updateTaskById);

router.put("assign/:idTask/:idUser", TaskController.assignTask);

router.delete("/:id", TaskController.deleteTask);

module.exports = router;
