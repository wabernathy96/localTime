module.exports = function(sequelize, DataTypes) {
  let event = sequelize.define("event", {
      event_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      location: {
          type: DataTypes.STRING,
          notEmpty: true
      },
      url: {
          type: DataTypes.STRING,
          notEmpty: true
      },
      date: {
          type: DataTypes.STRING,
          notEmpty: true
      },
      activity: {
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

//   event.associate = function (models) {
//     // We're saying that a group should belong to a planner
//     // A group can't be created without an planner due to the foreign key constraint
//     event.belongsTo(models.planner, {
//       foreignKey: {
//         allowNull: false
//       }
//     });
//   };

  
  return event;
}