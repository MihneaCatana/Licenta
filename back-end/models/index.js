const { Sequelize } = require("sequelize");

const sequelize = require("../config/db");

const UserModel = require("./user");
const DepartmentModel = require("./department");
const StatusUserModel = require("./statusUser");
const StatusTaskModel = require("./statusTask");
const TaskModel = require("./task");
const CommentModel = require("./comment");

const User = UserModel(sequelize, Sequelize);
const Department = DepartmentModel(sequelize, Sequelize);
const StatusUser = StatusUserModel(sequelize, Sequelize);
const StatusTask = StatusTaskModel(sequelize, Sequelize);
const Task = TaskModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);

Department.hasMany(User, { foreignKey: "idDepartment" });
User.belongsTo(Department, { foreignKey: "idDepartment" });

StatusUser.hasMany(User, { foreignKey: "idStatus" });
User.belongsTo(StatusUser, { foreignKey: "idStatus" });

User.hasMany(Comment, { foreignKey: "idUser" });
Comment.belongsTo(User, { foreignKey: "idUser" });

User.hasMany(Task, { foreignKey: "idUser" });
Task.belongsTo(User, { foreignKey: "idUser" });

Task.hasMany(Comment, { foreignKey: "idTask" });
Comment.belongsTo(Task, { foreignKey: "idTask" });

StatusTask.hasMany(Task, { foreignKey: "idStatusTask" });
Task.belongsTo(StatusTask, { foreignKey: "idStatusTask" });

module.exports = {
  User,
  Department,
  StatusUser,
  StatusTask,
  Task,
  Comment,
  connection: sequelize,
};
