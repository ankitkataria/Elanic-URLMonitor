var fs = require('fs');
var UrlController = require('../controllers/UrlController');

var routes = function(app) {
  app.post('/', UrlController.monitor);
  app.delete('/:id', UrlController.delete);
  app.put('/:id', UrlController.update);
  app.get('/:id', UrlController.get);
  app.get('/', UrlController.getAll);
};

module.exports = routes;

