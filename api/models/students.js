/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "students",
    {
      fullName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      nickName: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      id_batch: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      address: {
        type: DataTypes.STRING(10)
      }
    },
    {
      tableName: "students"
    }
  );
};
