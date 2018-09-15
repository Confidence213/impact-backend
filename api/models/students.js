/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  let students = sequelize.define(
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
        unique: true
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
      id_batch: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: "students"
    }
  );

  students.associate = function (models) {
    models.students.belongsTo(models.batches, {
      foreignKey: 'id_batch',
      targetKey: 'id'
    });
  };

  return students
};
