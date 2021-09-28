// POST   http://localhost:2053/companies       {name: 'Dishoom', logoURL: '//dishoom.com/assets/logo.png'}
// GET    http://localhost:2053/company/1       
// GET    http://localhost:2053/companies
// POST   http://localhost:2053/restaurants/1   {location: 'Shoreditch', capacity: 80, manager: 'John Doe'}
// POST   http://localhost:2053/menus/1         {title: 'All Day'}
// GET    http://localhost:2053/menus/1         
// POST   http://localhost:2053/meals/1         {name: 'Salmon'}
// GET    http://localhost:2053/meals/1
// PATCH  http://localhost:2053/company/1       {newName: 'Johns Restaurant', newLogoURL: '//johns.com/assets/logo.svg'}
// DELETE http://localhost:2053/company/1

// ! NOTE: FOR THIS TO RUN YOU MUST DELETE THE db.sqlite FILE.
// ! NOTE: FOR THIS TO RUN THE DATABASE MUST NOT BE RESET WITH: sequelize.sync({ force:true })

const request = require('supertest');
const assert = require('assert');
const app = require('./index');


describe('POST /companies', function() {
  it('Should create a company', function(done) {
    request(app)
      .post('/companies')
      .send({name: 'Dishoom', logoURL: '//dishoom.com/assets/logo.png'}) // x-www-form-urlencoded

      .expect(200, {
        message: 'success',
        data: { name: 'Dishoom', logoURL: '//dishoom.com/assets/logo.png' },
        id: 1
      }, done);
  });
});

describe('GET /company/1', function() {
  it('Should return all the company with id == 1', function(done) {
    request(app)
      .get('/company/1')

      .expect(200, {
        message: 'success',
        data: {
            "id": 1,
            "name": "Dishoom",
            "logoURL": "//dishoom.com/assets/logo.png"
        }
      }, done);
  });
});

describe('GET /companies', function() {
  it('Should return all companies', function(done) {
    request(app)
      .get('/companies')

      .expect(200, {
        message: 'success',
        data: [
          {
            "id": 1,
            "name": "Dishoom",
            "logoURL": "//dishoom.com/assets/logo.png"
          }
        ]
      }, done);
  });
});

describe('POST /restaurants/1', function() {
  it('Should create a restaurant for company with id == 1', function(done) {
    request(app)
      .post('/restaurants/1')
      .send({location: 'Shoreditch', capacity: 80, manager: 'John Doe'})

      .expect(200, {
        message: 'success',
        data: {location: 'Shoreditch', capacity: 80, manager: 'John Doe'},
        id: 1
      }, done);
  });
});

describe('POST /menus/1', function() {
  it('Should create a menu for a location with id == 1', function(done) {
    request(app)
      .post('/menus/1')
      .send({title: 'All Day'})

      .expect(200, {
        message: 'success',
        data: {title: 'All Day'},
        id: 1
      }, done);
  });
});

describe('GET /menus/1', function() {
  it('Should return the menu created above', function(done) {
    request(app)
      .get('/menus/1')

      .expect(200, {
        message: 'success',
        data: [
          {
            "companyId": 1,
            "id": 1,
            "title": "All Day"
          }
        ],
      }, done);
  });
});

describe('POST /meals/1', function() {
  it('Should create a meal for a menu with id == 1', function(done) {
    request(app)
      .post('/meals/1')
      .send({name: 'Salmon'})

      .expect(200, {
        message: 'success',
        data: {name: 'Salmon'},
        id: 1
      }, done);
  });
});

describe('GET /meals/1', function() {
  it('Should return the meal created above', function(done) {
    request(app)
      .get('/meals/1')

      .expect(200, {
        message: 'success',
        data: [
          {
            "id": 1,
            "menuId": 1,
            "name": "Salmon"
          }
        ]
      }, done);
  });
});

describe('PATCH /company/1', function() {
  it('Should edit the company with id == 1', function(done) {
    request(app)
      .patch('/company/1')
      .send({newName: 'Johns Restaurant', newLogoURL: '//johns.com/assets/logo.svg'})

      .expect(200, {
        message: 'success',
        data: {
          "name": 'Johns Restaurant',
          "logoURL": '//johns.com/assets/logo.svg'
        }
      }, done);
  });
});

describe('DELETE /company/1', function() {
  it('Should delete the company with id == 1', function(done) {
    request(app)
      .delete('/company/1')

      .expect(200, {
        message: 'success',
      }, done);
  });
});