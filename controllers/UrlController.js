var URL = require('../models/url.js');

var UrlController = {
  monitor: function(req, res) {
    console.log('[+] URL request received');
    var monitorRequest = req.body;
    URL.insertURL(monitorRequest).then(function(newURL) {
      console.log(newURL);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({id: newURL._id}));
    });
  },
};

module.exports = UrlController;
