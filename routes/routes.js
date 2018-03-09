var fs = require('fs');
var UrlController = require('../controllers/UrlController');

var routes = function(app) {
  app.post('/', UrlController.monitor);
  app.delete('/:id', UrlController.delete);
};

module.exports = routes;

