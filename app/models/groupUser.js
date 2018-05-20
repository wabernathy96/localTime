module.exports = (sequelize, DataTypes) => {
    
    const GroupUser = sequelize.define("groupUser",
        {
            groupUserId:
            {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            createdAt: 
            {
            type: DataTypes.DATE(),
            defaultValue: sequelize.literal('NOW()'),
            },
        }
    );

    GroupUser.associate = (models) => {
 
    };
    return GroupUser;
}