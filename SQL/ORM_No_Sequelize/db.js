var sqlite3 = require('sqlite3').verbose();

const path = require('path');
const dbPath = path.join(__dirname, 'db.sqlite');

module.exports = new sqlite3.Database(dbPath, (err) => {
  if (err) { console.error(err.message);
  } else { console.log(`Connected to the SQLite3 Database`); }
})