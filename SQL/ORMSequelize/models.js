const sequelize = require('./database');
const {DataTypes, Model} = require('sequelize');

class City extends Model {};

City.init({
    name: DataTypes.STRING,
    population: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'city',
    timestamps: false,
  }
)

class Landmark extends Model {};

Landmark.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'landmark',
    timestamps: false,
  }
)

module.exports = {City, Landmark};