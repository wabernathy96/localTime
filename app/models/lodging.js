// DEFAULT MODEL FOR LODGING

module.exports = function (sequelize, DataTypes) {
  var lodging = sequelize.define("lodging", {
    lodging_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    available_from: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    available_to: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    cost: {
      type: DataTypes.INTEGER,
      notEmpty: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
      notEmpty: true
    },
    createdAt: {
      type: DataTypes.DATE(),
      defaultValue: sequelize.literal('NOW()'),
    },
  })

  lodging.associate = function(models) {
    lodging.belongsTo(models.planner, {
        foreignKey: {
          allowNull: false
        }
      });
    }

  return lodging;
}