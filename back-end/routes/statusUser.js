const express = require("express");
const router = express.Router();
const statusUserController = require("../controller").statusUser;

router.post("/create", statusUserController.createStatus);

router.get("/", statusUserController.getAllStatuts);

router.get("/:id", statusUserController.getStatusById);

router.put("/:id", statusUserController.updateStatusById);

router.delete("/:id", statusUserController.deleteStatus);

module.exports = router;
