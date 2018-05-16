// USER MODEL

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("user", {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        lastname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            notEmpty: true
        },
        userimg: {
            type: DataTypes.STRING,
            vaildate:{
                isUrl: true
            },
            notEmpty: true
        },
        password: {
            type: DataTypes.STRING,

            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active',
            notEmpty: true
        },
        createdAt: {
            type: DataTypes.DATE(),
            defaultValue: sequelize.literal('NOW()'),
        },
    })

    User.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.planner, {
          onDelete: "cascade"
        });
      };
    return User;
}