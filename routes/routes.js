var fs = require('fs');
var HomeController = require('../controllers/HomeController');

var routes = function(app) {
  app.get('/:id', HomeController.Index);
};

module.exports = routes;

