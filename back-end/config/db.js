const { Sequelize } = require("sequelize");

const db_instance = new Sequelize("db_licenta", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db_instance;
