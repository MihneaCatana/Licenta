module.exports = (sequelize, DataTypes) => {
  return sequelize.define("statusUser", {
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
