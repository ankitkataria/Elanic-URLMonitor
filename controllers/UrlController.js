var URL = require('../models/url.js');
var monitorURL = require('../utils/monitorURL.js');
var percentile = require('../utils/percentile.js');

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
    console.log('[.] URL update request received');

    var id = req.params.id;
    var data = req.body;

    var result = await URL.updateURL(id, data);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({success: (result.n == 1) ?
      true : false, _id: id}));
  },
  get: async function(req, res) {
    var id = req.params.id;
    var urls = await URL.retrieveURLs({_id: id});
    console.log('[+] Retrieving url with id: ' + id);

    res.setHeader('Content-Type', 'application/json');

    if (!urls.length) {
      res.send(JSON.stringify({success: false}));
    } else if (urls.length == 1) {
      var percentileCalculator = percentile(urls[0].responses);
      var url = urls[0].toObject();

      [50, 75, 95, 99].forEach((n) => {
        url[n + 'th_percentile'] = percentileCalculator(n)
      });

      res.send(JSON.stringify(url));
    }
  },
  getAll: async function(req, res) {
    var urls = await URL.retrieveURLs({});
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({urls: urls}));
  },
};

module.exports = UrlController;
