module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("user", {
        user_id: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active',
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE(),
            defaultValue: sequelize.literal('NOW()'),
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE(),
            defaultValue: sequelize.literal('NOW() ON UPDATE NOW()'),
            allowNull: false
        },
    })
    return User;
}