/* jshint indent: 2 */

<<<<<<< HEAD
module.exports = function(sequelize, DataTypes) {
=======
module.exports = function (sequelize, DataTypes) {
>>>>>>> model-relations
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
      },
      image: {
        type: DataTypes.STRING(20)
      }
    },
    {
      timestamps: false,
      tableName: "batches"
    }
  );

<<<<<<< HEAD
  batches.associate = function(models) {
    models.batches.hasMany(models.students, {
      foreignKey: "id_batch",
=======
  batches.associate = function (models) {
    models.batches.hasMany(models.students, {
      foreignKey: 'id_batch',
>>>>>>> model-relations
      as: "students"
    });
  };

<<<<<<< HEAD
  return batches;
=======
  return batches
>>>>>>> model-relations
};
