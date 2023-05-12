module.exports = (sequelize, DataType) => {
  return sequelize.define("project", {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataType.DATE,
    },
  });
};
