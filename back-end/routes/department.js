const express = require("express");
const router = express.Router();
const departmentController = require("../controller").department;

router.post("/create", departmentController.createDepartment);

router.get("/", departmentController.getAllDepartments);

router.get("/:id", departmentController.getDepartmentById);

router.put("/:id", departmentController.updateDepartmentById);

router.delete("/:id", departmentController.deleteDeparment);

module.exports = router;
