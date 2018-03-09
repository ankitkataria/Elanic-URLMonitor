var URL = require('../models/url.js');
var monitorURL = require('../utils/monitorURL.js');

var UrlController = {
  monitor: async function(req, res) {
    console.log('[+] URL request received');

    var monitorRequest = req.body;

    var newURL = await URL.insertURL(monitorRequest);
    console.log(newURL);
    monitorURL.start(newURL);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({success: true, _id: newURL._id}));
  },
  delete: async function(req, res) {
    console.log('[-] URL delete request received');

    var id = req.params.id;

    var result = await URL.deleteURL(id);
    monitorURL.stop(id);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({success: (result.n == 1) ? true : false}));
  },
  update: async function(req, res) {
    var id = req.params.id;
    var data = req.body;

    var result = await URL.updateURL(id, data);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({success: (result.n == 1) ?
      true : false, _id: id}));
  },
  get: async function(req, res) {
    var id = req.params.id;
    var url = await URL.retrieveURL(id);
    console.log(url);
  },
};

module.exports = UrlController;
