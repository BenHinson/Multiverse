var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    // console.log(`Connected to the SQLite3 Database`);

    db.run(`CREATE TABLE user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text,
      email text UNIQUE,
      password text,
      CONSTRAINT email_unique UNIQUE (email)
    )`, (err) => {
      if (err) { console.log('Table Already Created!') }
      else {
        // console.log('Initial Setup');
        let insert = `INSERT INTO user (name, email, password) VALUES (?,?,?)`
        db.run(insert, ['admin', 'admin@example.com', 'admin'])
        db.run(insert, ['user', 'user@example.com', 'user'])
      }
    })
  }
})

module.exports = db;
