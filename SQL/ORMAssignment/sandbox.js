const sequelize = require('./db');
const {Cinemas, Screens, Screenings, Bookings, Movies} = require('./models');

setupDB = async() => {
  Cinemas.hasMany(Screens);
  Screens.belongsTo(Cinemas);

  Screens.hasMany(Screenings);
  Screenings.belongsTo(Screens);

  Movies.hasMany(Screenings, {as: 'movie', onDelete: 'cascade'});

  Screenings.hasMany(Bookings);
  Bookings.belongsTo(Screenings);

  await sequelize.sync({ force:true }); // force:true   (resets db each run)
}

(async() => {
  await setupDB();
  
  const NoTimeToDie = await Movies.create({title: 'No Time To Die', duration: 163});
  const odeon = await Cinemas.create({location: 'Trafalgar Square'});

  const screen = await odeon.createScreen({screen_size: 100, number_of_seats: 350});

  const screening = await screen.createScreening({start_time: 4.30, movieId: NoTimeToDie.id});
  const screening_two = await screen.createScreening({start_time: 6.00, movieId: NoTimeToDie.id});

  await screening.createBooking({email: 'bond@example.com', seat_number: 53});
  await screening.createBooking({email: '...@example.com', seat_number: 54});
  await screening_two.createBooking({email: 'JamesBond@example.com', seat_number: 55});


  // To find all the emails for users who booked to see 'No Time To Die'

  let bookingEmails = (await Bookings.findAll({where: {
    screeningId: (await Screenings.findAll({where: {
      movieId: (await Movies.findAll({where: {
        title: 'No Time To Die'
      }})).map(a => a.dataValues.id),
    }})).map(a => a.dataValues.id)
  }})).map(a => a.dataValues.email);
  
  console.log(bookingEmails)
})()