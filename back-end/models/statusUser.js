module.exports = (sequelize, DataTypes) => {
  return sequelize.define("status_user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
};
