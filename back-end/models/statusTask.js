module.exports = (sequelize, DataTypes) => {
  return sequelize.define("status_task", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  });
};
