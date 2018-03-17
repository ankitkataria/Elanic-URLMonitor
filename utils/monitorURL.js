const fetch = require('node-fetch');
const config = require('../config/config.json');
const URL = require('../models/url.js');

const intervalIds = {};

const monitorURL = {
  start: function(url) {
    let requestMethod = url.method.toUpperCase();
    let responses = [];

    intervalIds[url._id] = setInterval(function() {
      let startTime = new Date();

      fetch(url.url, {
        method: url.method,
        body: (requestMethod == 'GET' || requestMethod == 'HEAD') ?
          undefined : JSON.stringify(url.data),
        headers: url.headers,
      })
        .then(function(response) {
          let endTime = new Date();
          let elapsedTime = endTime.getTime() - startTime.getTime();

          responses.push(elapsedTime);

          // to ensure there are only the last 100 responses at a time
          if (responses.length > 100)
            responses.shift();

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
