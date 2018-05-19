// DEFAULT MODEL FOR LODGING

module.exports = function (sequelize, DataTypes) {
  var date = sequelize.define("date", {
    dates_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    available_from: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    available_to: {
      type: DataTypes.STRING,
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

  date.associate = function(models) {
    date.belongsTo(models.user, {
        foreignKey: {
          allowNull: false
        }
      });
    }

  return date;
}