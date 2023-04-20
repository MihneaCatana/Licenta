module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
    },
    idDepartament: {
      type: DataTypes.INTEGER,
    },
    idStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    activeAccount: {
      type: DataTypes.BOOLEAN,
    },
  });
};
