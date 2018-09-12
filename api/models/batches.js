/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
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
};
