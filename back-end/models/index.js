const { Sequelize } = require("sequelize");

const sequelize = require("../config/db");

const UserModel = require("./user");
const DepartmentModel = require("./department");
const StatusUserModel = require("./statusUser");
const StatusTaskModel = require("./statusTask");
const TaskModel = require("./task");

const User = UserModel(sequelize, Sequelize);
const Department = DepartmentModel(sequelize, Sequelize);
const StatusUser = StatusUserModel(sequelize, Sequelize);
const StatusTask = StatusTaskModel(sequelize, Sequelize);
const Task = TaskModel(sequelize, Sequelize);

// User.hasOne(StatusUser, { foreignKey: "id" });
// StatusUser.belongsTo(User, { foreignKey: "" });

module.exports = {
  User,
  Department,
  StatusUser,
  StatusTask,
  Task,
  connection: sequelize,
};
