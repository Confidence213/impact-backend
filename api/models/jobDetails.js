/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  let jobDetails = sequelize.define(
    "jobDetails",
    {
      jobName: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      jobDesc: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      location: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      id_company: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      qualifications: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      employmentType: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      minimumExperience: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: "jobDetails"
    }
  );

  jobDetails.associate = function (models) {
    models.jobDetails.belongsTo(models.partners, {
      foreignKey: 'id_company',
      targetKey: 'id'
    });
  };

  return jobDetails
};
