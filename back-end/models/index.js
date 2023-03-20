const { Sequelize } = require("sequelize");

const DB = require("../config/db");

const UserModel = require("./user");
const DepartmentModel = require("./department");
const StatusUserModel = require("./statusUser");

const User = UserModel(DB, Sequelize);
const Department = DepartmentModel(DB, Sequelize);
const StatusUser = StatusUserModel(DB, Sequelize);

const db = {}
db.sequelize = Sequelize

module.exports = {
  User,
  Department,
  StatusUser,
  db
};
