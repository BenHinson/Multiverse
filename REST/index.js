const express = require("express");
const subdomain = require('express-subdomain');

const sandbox = require('./initialise.js');
const { Companies, Locations, Menus, Meals } = require("./models.js");

const app = express();
const playgroundRouter = express.Router({mergeParams: true});

app.use(subdomain('playground', playgroundRouter))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/////////////////////////////////////////////////////////

app.listen(2053, () => {console.log(`Server running on port: ${2053}`)});


app.get('/companies', async(req, res) => { // Get all companies
  Companies.findAll().then((e) => {
    return res.json({
      'message': 'success',
      'data': e.map(e => e.dataValues)
    });
  }).catch((err) => res.json({'message': 'failed', 'error': err}))
})
app.get('/company/:companyId', async(req, res) => { // Get a company by their id
  const companyId = req.params.companyId;

  Companies.findOne({where: {id: companyId}}).then((e) => {
    return res.json({
      'message': 'success',
      'data': e.dataValues
    });
  }).catch((err) => res.json({'message': 'failed', 'error': err}))
})
app.get('/menu/:menuId', async(req, res) => { // Get a menu by its id
  const menuId = req.params.menuId;

  Menus.findOne({where: {id: menuId}}).then((e) => {
    return res.json({
      'message': 'success',
      'data': e.dataValues
    });
  }).catch((err) => res.json({'message': 'failed', 'error': err}))
})
app.get('/menus/:companyId', async(req, res) => { // Get all of a companies menus
  const companyId = req.params.companyId;

  Menus.findAll({where: {companyId: companyId}}).then((e) => {
    return res.json({
      'message': 'success',
      'data': e.map(e => e.dataValues)
    });
  }).catch((err) => res.json({'message': 'failed', 'error': err}))
})
app.get('/meals/:menuId', async(req, res) => { // Get all of a specific menu’s items
  const menuId = req.params.menuId;

  Meals.findAll({where: {menuId: menuId}}).then((e) => {
    return res.json({
      'message': 'success',
      'data': e.map(e => e.dataValues)
    });
  }).catch((err) => res.json({'message': 'failed', 'error': err}))
})



app.post('/companies', async(req, res) => { // Create a company
  const {name, logoURL} = req.body;
  if (!name || !logoURL || typeof name !== 'string' || typeof logoURL !== 'string') {
    return res.status(400).json({'error': 'Please provide a name and logoURL'})
  }

  Companies.create({name, logoURL}).then((e) => {
    res.json({
      'message': 'success',
      'data': {name, logoURL},
      'id': e.dataValues.id,
    });
  }).catch((err) => {res.json({'message': 'failed', 'error': err})})
})
app.post('/restaurants/:companyId', async(req, res) => { // Create a restaurant for a company
  const {location, capacity, manager} = req.body;
  if (!location || !capacity || !manager) {
    return res.status(400).json({'error': 'Please provide a location, the capacity and manager'})
  } else if (!req.params.companyId || !Companies.findOne({where: {id: req.params.companyId}})) {
    return res.status(400).json({'error': 'No Company id provided.'})
  }

  Locations.create({location, capacity, manager, companyId: req.params.companyId}).then((e) => {
    res.json({
      'message': 'success',
      'data': {location, capacity, manager},
      'id': e.dataValues.id,
    });
  }).catch((err) => {res.json({'message': 'failed', 'error': err})});
})
app.post('/menus/:companyId', async(req, res) => { // Create a menu for a company
  const {title} = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({'error': 'Please provide a location, the capacity and manager'})
  } else if (!req.params.companyId || !Companies.findOne({where: {id: req.params.companyId}})) {
    return res.status(400).json({'error': 'No Company id provided.'})
  }

  Menus.create({title, companyId: req.params.companyId}).then((e) => {
    res.json({
      'message': 'success',
      'data': {title},
      'id': e.dataValues.id,
    });
  }).catch((err) => {res.json({'message': 'failed', 'error': err})});
})
app.post('/meals/:menuId', async(req, res) => {
  const {name} = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({'error': 'Please provide a name for the meal'})
  } else if (!req.params.menuId || !Menus.findOne({where: {id: req.params.menuId}})) {
    return res.status(400).json({'error': 'No Company id provided.'})
  }

  Meals.create({name, menuId: req.params.menuId}).then((e) => {
    res.json({
      'message': 'success',
      'data': {name},
      'id': e.dataValues.id,
    });
  }).catch((err) => {res.json({'message': 'failed', 'error': err})})
})



app.delete('/company/:companyId', async(req, res) => { // Delete a company by their id.
  const companyId = req.params.companyId;
  Companies.destroy({where: {id: companyId}}).then((e) => {
    return res.json({
      'message': 'success'
    })
  }).catch((err) => res.json({'message': 'failed', 'error': err}));
})
app.delete('/restaurants/:restaurantId', async(req, res) => { // Delete a company by their id.
  const restaurantId = req.params.restaurantId;
  Locations.destroy({where: {id: restaurantId}}).then((e) => {
    return res.json({
      'message': 'success'
    })
  }).catch((err) => res.json({'message': 'failed', 'error': err}));
})
app.delete('/menu/:menuId', async(req, res) => { // Delete a menu
  const menuId = req.params.menuId;
  Menus.destroy({where: {id: menuId}}).then((e) => {
    return res.json({
      'message': 'success'
    })
  }).catch((err) => res.json({'message': 'failed', 'error': err}))
})



app.patch('/company/:companyId', async(req, res) => { // Replace a specific company
  const companyId = req.params.companyId;
  const {newName, newLogoURL} = req.body;
  if (typeof newName !== 'string' || typeof newLogoURL !== 'string') { return res.status(400).json({'error': 'Please provide a valid new name and logoURL for the company'}) }

  Companies.update({name: newName, logoURL: newLogoURL}, {where: {id: companyId}}).then((e) => {
    res.json({
      'message': 'success',
      'data': {name: newName, logoURL: newLogoURL}
    })
  }).catch((err) => res.json({'message': 'failed', 'error': err}))
})



app.get('/', (req, res, next) => { res.json({'message': 'success'}) });

app.use(function(req, res) { res.status(400) });

module.exports = app;