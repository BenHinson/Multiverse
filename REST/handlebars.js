const express = require("express");
const subdomain = require('express-subdomain');
const path= require('path');

const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");

const sandbox = require('./initialise.js');
const { Companies, Locations, Menus, Meals } = require("./models.js");
const { checkUser } = require('./auth');

const app = express();
const playgroundRouter = express.Router({mergeParams: true});

app.use(subdomain('playground', playgroundRouter))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const handlebars = expressHandlebars({handlebars: allowInsecurePrototypeAccess(Handlebars)});
app.engine("handlebars", handlebars);
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "handlebars");

/////////////////////////////////////////////////////////

app.listen(2053, () => {console.log(`Server running on port: ${2053}`)});




app.get('/companies', async (req, res) => {
    Companies.findAll().then((e) => {
      return res.render('companies', {
        'company': e.map(e => e.dataValues)
      });
    }).catch((err) => res.json({'message': 'failed', 'error': err}))
})
app.get('/company/:companyId', async(req, res) => { // Get a company by their id
  const companyId = req.params.companyId;

  const companyData = await Companies.findOne({where: {id: companyId}});
  const restaurantData = await Locations.findAll({where: {companyId: companyId}});
  const menuData = await Menus.findAll({where: {companyId: companyId}});

  return res.render('company', {
    'company': companyData.dataValues,
    'restaurant': restaurantData.map(e => e.dataValues),
    'menu': menuData.map(e => e.dataValues)
  });
})
app.get('/meals/:menuId', async(req, res) => { // Get all of a specific menu’s items
  const menuId = req.params.menuId;

  const menuData = await Menus.findOne({where: {id: menuId}});
  const mealData = await Meals.findAll({where: {menuId: menuId}});

  return res.render('meals', {
    'menu': menuData?.dataValues,
    'meal': mealData?.map(e => e.dataValues)
  });
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









app.get('/', (req, res, next) => { res.json({'message': 'success'}) });

app.use(function(req, res) { res.status(400) });

module.exports = app;