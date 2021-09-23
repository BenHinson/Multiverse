const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');

class Cinemas extends Model {};
class Screens extends Model {};
class Screenings extends Model {};
class Bookings extends Model {};
class Movies extends Model {};

Cinemas.init({
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cinemas',
    timestamps: false
  }
)
Screens.init({
    screen_size: DataTypes.INTEGER,
    number_of_seats: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'screens',
    timestamps: false
  }
)
Screenings.init({
    start_time: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'screenings',
    timestamps: false
  }
)
Bookings.init({
    email: DataTypes.STRING,
    seat_number: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'bookings',
    timestamps: false
  }
)


Movies.init({
    title: DataTypes.STRING,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'movies',
    timestamps: false
  }
)


module.exports = {Cinemas, Screens, Screenings, Bookings, Movies};