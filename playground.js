const express = require('express');
const Playground_Router = express.Router();

Playground_Router.get('/example', function(req, res) {
  res.sendFile('./playground.html', {root: __dirname});
})

module.exports = Playground_Router;
