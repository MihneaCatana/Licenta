const express = require("express");
const router = express.Router();
const UserRoute = require("./user");
const DepartmentRoute = require("./department");
const OthersRoute = require("./others");

router.use("/user", UserRoute);
router.use("/department", DepartmentRoute);
router.use("/other", OthersRoute);

module.exports = router;
