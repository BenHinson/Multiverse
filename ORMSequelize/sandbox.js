const sequelize = require('./database');
const {City, Landmark} = require('./objects');

setupDB = async() => {
  City.hasMany(Landmark);
  Landmark.belongsTo(City);
  await sequelize.sync();
}

sandbox = async() => {
  await setupDB();
  const london = await City.create({
    name: 'London',
    population: 9_000_000,
  });
  const madrid = await City.create({
    name: 'Madrid',
    population: 3_000_000,
  })
  const nelson = await london.createLandmark({
    name: 'Nelson\'s Column'
  })
  const eye = await london.createLandmark({
    name: 'London Eye'
  })
  const plaza = await madrid.createLandmark({
    name: 'Plaza Mayor'
  })
}
sandbox();