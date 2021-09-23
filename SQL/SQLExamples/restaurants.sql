CREATE TABLE companies(
  id INTEGER PRIMARY KEY,
  name TEXT,
  location TEXT,
  numEmployees INTEGER
);

INSERT INTO companies (name, location, numEmployees) VALUES ('Facebook', 'London', 8000);
INSERT INTO companies (name, location, numEmployees) VALUES ('Tesco', 'Welling', 150000);


SELECT location, name, numEmployees FROM companies;
SELECT * FROM companies WHERE numEmployees > 10000;


UPDATE companies SET numEmployees=8500 WHERE name = 'Facebook';

SELECT * from companies WHERE name='Facebook';


DELETE FROM companies WHERE location='Welling';

DROP TABLE companies