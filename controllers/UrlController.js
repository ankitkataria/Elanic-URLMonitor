const URL = require('../models/url.js');
const monitorURL = require('../utils/monitorURL.js');
const percentile = require('../utils/percentile.js');

const UrlController = {
  monitor: async function(req, res) {
    console.log('[+] URL request received');

    let monitorRequest = req.body;

    let newURL = await URL.insertURL(monitorRequest);
    console.log(newURL);
    monitorURL.start(newURL);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({success: true, _id: newURL._id}));
  },
  delete: async function(req, res) {
    console.log('[-] URL delete request received');

    let id = req.params.id;

    let result = await URL.deleteURL(id);
    monitorURL.stop(id);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({success: (result.n == 1) ? true : false}));
  },
  update: async function(req, res) {
    console.log('[.] URL update request received');

    let id = req.params.id;
    let data = req.body;

    let result = await URL.updateURL(id, data);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({success: (result.n == 1) ?
      true : false, _id: id}));
  },
  get: async function(req, res) {
    let id = req.params.id;
    let urls = await URL.retrieveURLs({_id: id});
    console.log('[+] Retrieving url with id: ' + id);

    res.setHeader('Content-Type', 'application/json');

    if (!urls.length) {
      res.send(JSON.stringify({success: false}));
    } else if (urls.length == 1) {
      let percentileCalculator = percentile(urls[0].responses);
      let url = urls[0];

      [50, 75, 95, 99].forEach((n) => {
        url[n + 'th_percentile'] = percentileCalculator(n);
      });

      res.send(JSON.stringify(url));
    }
  },
  getAll: async function(req, res) {
    let urls = await URL.retrieveURLs({});
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({urls: urls}));
  },
};

module.exports = UrlController;
