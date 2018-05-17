// PLANNER MODEL

module.exports = function (sequelize, DataTypes) {
  var planner = sequelize.define("planner", {
    planner_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: DataTypes.STRING,
    location: DataTypes.STRING,
    activity_genre: DataTypes.STRING,
    flag: DataTypes.BOOLEAN
  })

  
  planner.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    planner.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });

    planner.hasMany(models.group, {
      onDelete: "cascade"
    });
    
    planner.hasMany(models.lodging, {
      onDelete: "cascade"
    });

    planner.hasMany(models.event, {
      onDelete: "cascade"
    });
  };
  
  return planner;
}