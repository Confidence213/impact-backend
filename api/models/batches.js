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
        type: Date,
        allowNull: false
      },
      endDate: {
        type: Date,
        allowNull: false
      }
    },
    {
      tableName: "batches"
    }
  );
};
