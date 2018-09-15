/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  let batches = sequelize.define(
    "batches",
    {
      batchName: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: "batches"
    }
  );

  batches.associate = function (models) {
    models.batches.hasMany(models.students, {
      foreignKey: 'id',
      as: 'batches'
    });
  };

  return batches
};
