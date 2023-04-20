const express = require("express");
const router = express.Router();
const othersController = require("../controller").others;

router.get("/reset", othersController.resetDB);

module.exports = router;
