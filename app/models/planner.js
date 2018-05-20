module.exports = function (sequelize, DataTypes) {
  var Planner = sequelize.define("planner", 
      {
          planner_id: 
          {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true,
          },
          availableFrom: 
          {
              type: DataTypes.STRING,
              notEmpty: true
          },
          availableTo: 
          {
              type: DataTypes.STRING,
              notEmpty: true
          },
          city:
          {
              type: DataTypes.STRING
          },
          events: 
          {
              type: DataTypes.STRING
          },
          status: 
          {
              type: DataTypes.ENUM('active', 'inactive'),
              defaultValue: 'active',
              notEmpty: true
          }
      }
  );

  
  Planner.associate = function(models) {
    
      Planner.belongsTo(models.group, 
          {
              foreignKey: 'groupId'
          }
      );
  };
  return Planner;
}