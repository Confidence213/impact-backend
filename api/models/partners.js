/* jshint indent: 2 */

<<<<<<< HEAD
module.exports = function(sequelize, DataTypes) {
=======
module.exports = function (sequelize, DataTypes) {
>>>>>>> model-relations
  let partners = sequelize.define(
    "partners",
    {
      companyName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      companyAddress: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      companyIndustry: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: "partners"
    }
  );

<<<<<<< HEAD
  partners.associate = function(models) {
    models.partners.hasMany(models.jobDetails, {
      targetKey: "id"
    });
  };

  return partners;
=======
  partners.associate = function (models) {
    models.partners.hasMany(models.jobDetails, {
      targetKey: 'id'
    });
  };

  return partners
>>>>>>> model-relations
};
