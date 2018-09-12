/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "job_details",
    {
      jobName: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      job_desc: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      tableName: "job_details"
    }
  );
};
