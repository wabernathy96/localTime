module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", 
        {
            userId: 
            {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            googleID: 
            {
                type: DataTypes.STRING,
            },
            firstName: 
            {
                type: DataTypes.STRING,
                notEmpty: true
            },
            lastName: 
            {
                type: DataTypes.STRING,
                notEmpty: true
            },
            email: 
            {
                type: DataTypes.STRING,
                validate: 
                    {
                        isEmail: true
                    },
                notEmpty: true
            },
            userImg: 
            {
                type: DataTypes.STRING,
                validate:
                    {
                        isUrl: true
                    },
                notEmpty: true
            },
            password: 
            {
                type: DataTypes.STRING,
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
            googleToken: 
            {
                type: DataTypes.STRING,
            },
        }
    );

    User.associate = (models) => {
       
        User.belongsToMany(models.group, 
            {
                through: 'groupUser',
                as: 'user',
                foreignKey: 'userId'

            }
        );

        User.hasOne(models.date, 
            {
                foreignKey: 'userId'
            }
        );

        User.hasOne(models.planner,
            {
                foreignKey: 'userId'
            }
        );
    };
    return User;
}