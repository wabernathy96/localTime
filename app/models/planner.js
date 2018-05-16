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

  planner.associate = function (models) {
    // We're saying that a planner should belong to a user
    // A planner can't be created without an Author due to the foreign key constraint
    planner.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
    
  };

  planner.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    planner.hasMany(models.group, {
      onDelete: "cascade"
    });
  };

  planner.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    planner.hasMany(models.group, {
      onDelete: "cascade"
    });
  };

  return planner;
}