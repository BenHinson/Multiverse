.mode column
.headers on

CREATE TABLE companies(
  id INTEGER PRIMARY KEY,
  name TEXT,
  logoURL TEXT
);

CREATE TABLE locations(
  id INTEGER PRIMARY KEY,
  location TEXT,
  capacity INTEGER,
  manager TEXT,
  
  company_id INTEGER,
  menu_id INTEGER,
  FOREIGN KEY(company_id) REFERENCES companies(id),
  FOREIGN KEY (menu_id) REFERENCES menus(id)
);

CREATE TABLE menus(
  id INTEGER PRIMARY KEY,
  title TEXT
);





INSERT INTO companies (id, name, logoURL) VALUES (1, 'McDonalds', '/assets/logo_final_final_real2.svg');

INSERT INTO menus (id, title) VALUES (1, 'menu 1');
INSERT INTO menus (id, title) VALUES (2, 'menu 2');

INSERT INTO locations (id, company_id, menu_id, location, capacity, manager) VALUES (1, 1, 1, 'Cheltenham', 50, 'John Lennon');


SELECT id, logoURL FROM companies WHERE name='McDonalds';

UPDATE locations SET manager='Jon Favreau' WHERE location = 'Cheltenham';

SELECT company_id FROM locations WHERE manager='Jon Favreau';

SELECT name FROM companies WHERE id in (SELECT company_id FROM locations WHERE manager='Jon Favreau');

DELETE FROM menus WHERE id=2;


-- SQLite Specific
--   PRAGMA table_info(companies);
--   SELECT name FROM companies WHERE type='table'