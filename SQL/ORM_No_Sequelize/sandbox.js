const db = require('./db');
const {Cinemas, Screens, Screenings, Bookings, Movies} = require('./models');

(async() => {
  const NoTimeToDie = await Movies.create({title: 'No Time To Die', duration: 163});
  const odeon = await Cinemas.create({location: 'Trafalgar Square'});

  console.log(NoTimeToDie);

  // const screen = await odeon.createScreen({screen_size: 100, number_of_seats: 350});

  console.log(Cinemas.table, Cinemas.columns)
  // const screen = await odeon.createScreen({screen_size: 100, number_of_seats: 350});
  // const screening = await screen.createScreening({start_time: 4.30, movieId: NoTimeToDie.id});
  // const booking = await screening.createBooking({email: 'James@example.com', seat_number: 53});
})()

// sqlite3 wrapper