var URL = require('../models/url.js');
var monitorURL = require('../utils/monitorURL.js');

var UrlController = {
  monitor: function(req, res) {
    console.log('[+] URL request received');

    var monitorRequest = req.body;

    URL.insertURL(monitorRequest).then(function(newURL) {
      console.log(newURL);
      monitorURL.start(newURL);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({success: true, _id: newURL._id}));
    });
  },
  delete: function(req, res) {
    console.log('[-] URL delete request received');

    var id = req.params.id;

    URL.deleteURL(id)
      .then(function(result) {
        monitorURL.stop(id);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({success: (result.n == 1) ? true: false}));
      });
  },
  update: function(req, res) {
    var id = req.params.id;
    var data = req.body;
    URL.updateURL(id, data).then(function(result) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({success: (result.n == 1) ? true: false, _id: id}));
    });
  },
};

module.exports = UrlController;
