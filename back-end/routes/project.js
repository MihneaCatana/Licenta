const express = require("express");
const {department: departmentController} = require("../controller");
const router = express.Router();
const projectController = require("../controller").project;

router.post("/create", projectController.createProject);

router.get("/", projectController.getAllProjects);

router.get("/:id", projectController.getProjectById);

router.get("/name/:name", projectController.getProjectByName)

router.put("/:id", projectController.updateProjectById);

router.delete("/:id", projectController.deleteProject);

module.exports = router;
