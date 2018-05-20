// DEFAULT MODEL FOR LODGING

module.exports = (sequelize, DataTypes) => {
  const Date = sequelize.define('date', 
    {
      dateId: 
      {
        type: DataTypes.UUID,
        default: DataTypes.UUIDV4,
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
      createdAt: 
      {
        type: DataTypes.DATE(),
        defaultValue: sequelize.literal('NOW()'),
      },
      updateAt:
      {
        type: DataTypes.DATE(),
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
    }
  );

  Date.associate = (models) => {

    Date.belongsTo(models.user,
      {
        foreignKey:'userId'
      }
    );
  };
  return Date;
}