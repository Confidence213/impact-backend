/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "students",
    {
      fullName: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      nickName: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        primaryKey: true
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      address: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      batchName: {
        type: DataTypes.STRING(15),
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: "students"
    }
  );
};
