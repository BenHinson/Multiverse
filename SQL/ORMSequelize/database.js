const { Sequelize } = require('sequelize');
const path = require('path');

// const sequelize = new Sequelize('sqlite::memory');  // for in ram

const dbPath = path.join(__dirname, 'db.sqlite');

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath
});

module.exports = sequelize;