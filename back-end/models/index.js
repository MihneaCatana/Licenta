const { Sequelize } = require("sequelize");

const sequelize = require("../config/db");

const UserModel = require("./user");
const DepartmentModel = require("./department");
const StatusUserModel = require("./statusUser");

const User = UserModel(sequelize, Sequelize);
const Department = DepartmentModel(sequelize, Sequelize);
const StatusUser = StatusUserModel(sequelize, Sequelize);

module.exports = {
  User,
  Department,
  StatusUser,
  connection: sequelize,
};
