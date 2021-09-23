const db = require('./db');


class Model {
  init = (columns, setup) => {
    this.table = setup.modelName;
    this.columns = columns.map(a => a.split(' ')[0]);

    db.run(`CREATE TABLE ${this.table} (
      ${columns.toString()}
    )`, (err) => {
      if (!err) { console.log('Table created successfully') }
    })
  }

  create = async(data) => {
    let [keys, values] = [Object.keys(data), Object.values(data)];
    
    db.run(
      `INSERT INTO ${this.table} (${keys.toString()}) VALUES (${Array(keys.length).fill('?').toString()})`,
      values, function(err) {
        console.log(this.lastID)
    })
  }
}

const Cinemas = new Model();
const Screens = new Model();
const Screenings = new Model();
const Bookings = new Model();
const Movies = new Model();

Cinemas.init(['location TEXT'], { modelName: 'cinemas' })
Screens.init(['screen_size INTEGER', 'number_of_seats INTEGER'], { modelName: 'screens' })
Screenings.init(['start_time INTEGER'], { modelName: 'screenings' })
Bookings.init(['email TEXT', 'seat_number INTEGER'], { modelName: 'bookings' })
Movies.init(['title TEXT', 'duration INTEGER'], { modelName: 'movies' })


module.exports = {Cinemas, Screens, Screenings, Bookings, Movies};