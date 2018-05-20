module.exports =  (sequelize, DataTypes) => {
  let Planner = sequelize.define("planner", 
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
      createdAt: 
      {
        type: DataTypes.DATE(),
        defaultValue: sequelize.literal('NOW()'),
      },
      updateAt:
      {
        type: DataTypes.DATE(),
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP()'),
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

    Planner.belongsTo(models.user,
      {
        foreignKey: 'userId'
      }
    );
  };
  return Planner;
}