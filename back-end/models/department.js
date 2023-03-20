module.exports = (sequelize, DataTypes) => {
  return sequelize.define("department", {
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
