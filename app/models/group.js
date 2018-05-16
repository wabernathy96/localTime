// USER MODEL

module.exports = function(sequelize, DataTypes) {
  let group = sequelize.define("group", {
      group_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      members: {
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

  group.associate = function (models) {
    // We're saying that a group should belong to a planner
    // A group can't be created without an planner due to the foreign key constraint
    group.belongsTo(models.planner, {
      foreignKey: {
        allowNull: false
      }
    });
  };


  return group;
}