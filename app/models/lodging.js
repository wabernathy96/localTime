module.exports = function(sequelize, DataTypes){
  var lodging = sequelize.define("lodging", {
    url: DataTypes.STRING,
    address: DataTypes.STRING,
    book_from: DataTypes.DATE,
    book_to: DataTypes.DATE,
    cost: DataTypes.INTEGER,
    flag: DataTypes.BOOLEAN
  })

  return lodging;
}