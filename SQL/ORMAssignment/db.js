// Cinema Sequel

// Cinema Sequel++
// Complete the same assignment without using the Sequelize library. Instead, use a library like sqlite3 and write classes for the cinemas, movies and screenings which contain methods such as save, update etc to write raw SQL.


const { Sequelize } = require('sequelize');
const path = require('path');

const dbPath = path.join(__dirname, 'db.sqlite');

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
  logging: false
});

module.exports = sequelize;