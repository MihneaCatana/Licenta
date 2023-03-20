const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("licenta", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
