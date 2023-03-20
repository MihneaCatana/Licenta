const express = require("express");
const router = express.Router();
const UserRoute = require("./user");
const OthersRoute = require("./others");

router.use("/user", UserRoute);
router.use("/others",OthersRoute)

module.exports = router;
