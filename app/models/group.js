module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('group', 
        {
            groupId: 
            {
                type: DataTypes.UUID,
                default: DataTypes.UUIDV4,
                primaryKey: true,
            },
            members: 
            {
                type: DataTypes.STRING,
                notEmpty: true
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
            status: 
            {
                type: DataTypes.ENUM('active', 'inactive'),
                defaultValue: 'active',
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

    Group.associate = (models) => {

        Group.hasOne(models.planner,
            {
                foreignKey: 'groupId'
            }
        );

        Group.belongsToMany(models.user,
            {
                through: 'groupUser',
                as: 'group',
                foreignKey: 'groupId'
            }
        );
    };
  return Group;
}