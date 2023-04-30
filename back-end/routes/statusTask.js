const express = require("express");
const router = express.Router();
const statusTaskController = require("../controller").statusTask;

router.post("/create", statusTaskController.createStatus);

router.get("/", statusTaskController.getAllStatuts);

router.get("/:id", statusTaskController.getStatusById);

router.put("/:id", statusTaskController.updateStatusById);

router.delete("/:id", statusTaskController.deleteStatus);

module.exports = router;
