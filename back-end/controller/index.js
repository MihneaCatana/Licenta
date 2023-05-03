const others = require("./others");
const user = require("./user");
const department = require("./department");
const statusUser = require("./statusUser");
const statusTask = require("./statusTask");
const task = require("./task");
const comment = require("./comment");

const controller = {
  others,
  user,
  department,
  statusUser,
  statusTask,
  task,
  comment,
};

module.exports = controller;
