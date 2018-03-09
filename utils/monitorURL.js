var fetch = require('node-fetch');
var config = require('../config/config.json');
var URL = require('../models/url.js');

var intervalIds = {};

var monitorURL = {
  start: function(url) {
    var requestMethod = url.method.toUpperCase();
    var responses = [];

    intervalIds[url._id] = setInterval(function() {
      var startTime = new Date();

      fetch(url.url, {
        method: url.method,
        body: (requestMethod == 'GET' || requestMethod == 'HEAD') ?
          undefined : JSON.stringify(url.data),
        headers: url.headers,
      })
        .then(function(response) {
          var endTime = new Date();
          var elapsedTime = endTime.getTime() - startTime.getTime();

          responses.push(elapsedTime);
          URL.updateURL(url._id, {
            responses: responses,
          });
        });
    }, config.monitorTime);
  },
  stop: function(id) {
    clearInterval(intervalIds);
  },
};

module.exports = monitorURL;
