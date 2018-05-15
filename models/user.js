const uuidv4 = require('uuid/v4');
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    let user = sequelize.define("user", {
        user_id: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        flag: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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

    return user;
}