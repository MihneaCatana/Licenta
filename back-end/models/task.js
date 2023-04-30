module.exports = (sequelize, DataTypes) => {
  return sequelize.define("task", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    idStatusTask: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    deadline: {
      type: DataTypes.DATE,
    },
    finishedTime: {
      type: DataTypes.DATE,
    },
    idUser: {
      type: DataTypes.INTEGER,
    },
  });
};
