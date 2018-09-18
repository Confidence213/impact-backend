/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let students_apply = sequelize.define(
    "students_apply",
    {
      id_students: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      id_jobDetails: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      apply_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["id_students", "id_jobDetails"]
        }
      ],
      timestamps: false,
      tableName: "students_apply"
    }
  );

  students_apply.associate = function(models) {
    models.students_apply.hasMany(models.students, {
      foreignKey: "id",
      targetKey: "id_students"
    });
    models.students_apply.hasMany(models.jobDetails, {
      foreignKey: "id",
      targetKey: "id_jobDetails"
    });
  };

  return students_apply;
};
