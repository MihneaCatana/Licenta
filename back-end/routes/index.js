const express = require("express");
const router = express.Router();
const UserRoute = require("./user");
const DepartmentRoute = require("./department");
const StatusUserRoute = require("./statusUser");
const StatusTaskRoute = require("./statusTask");
const TaskRoute = require("./task");
const OthersRoute = require("./others");
const CommentRoute = require("./comment");

router.use("/user", UserRoute);
router.use("/department", DepartmentRoute);
router.use("/statusUser", StatusUserRoute);
router.use("/statusTask", StatusTaskRoute);
router.use("/task", TaskRoute);
router.use("/comment", CommentRoute);
router.use("/other", OthersRoute);

module.exports = router;
