var fs = require('fs');
var UrlController = require('../controllers/UrlController');

var routes = function(app) {
  app.post('/', UrlController.monitor);
};

module.exports = routes;

