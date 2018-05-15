module.exports = function(sequelize, DataTypes){
  var planner = sequelize.define("planner", {
    date: DataTypes.STRING,
    location: DataTypes.STRING,
    activity_genre: DataTypes.STRING,
    flag: DataTypes.BOOLEAN
  })

  return planner;
}