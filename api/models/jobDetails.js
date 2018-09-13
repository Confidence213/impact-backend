/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "jobDetails",
    {
      jobName: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      jobDesc: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      location: {
        type: DataTypes.STRING(30),
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: "jobDetails"
    }
  );
};
