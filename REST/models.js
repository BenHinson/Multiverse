const sequelize = require('./database');
const {DataTypes, Model} = require('sequelize');

class Companies extends Model {};
class Locations extends Model {};
class Menus extends Model {};
class Meals extends Model {};

Companies.init({
    name: DataTypes.STRING,
    logoURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'companies',
    timestamps: false
  }
)
Locations.init({
    location: DataTypes.TEXT,
    capacity: DataTypes.INTEGER,
    manager: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'locations',
    timestamps: false
  }
)
Menus.init({
    title: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'menus',
    timestamps: false
  }
)
Meals.init({
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'meals',
    timestamps: false
  }
)

module.exports = {Companies, Locations, Menus, Meals};