const express = require("express");
const router = express.Router();
const projectController = require("../controller").project;

router.post("/create", projectController.createProject);

router.get("/", projectController.getAllProjects);

router.get("/:id", projectController.getProjectById);

router.put("/:id", projectController.updateProjectById);

router.delete("/:id", projectController.deleteProject);

module.exports = router;
