const sequelize = require('./database');
const {Companies, Locations, Menus, Meals} = require('./models');

(async() => {
  Companies.hasMany(Locations, { onDelete: 'cascade' });
  Locations.belongsTo(Companies);
  Companies.hasMany(Menus, { onDelete: 'cascade' });
  Menus.belongsTo(Companies);

  Menus.hasMany(Meals);
  Meals.belongsTo(Menus);

  await sequelize.sync({ force:true }); // force:true   (resets db each run)
})()