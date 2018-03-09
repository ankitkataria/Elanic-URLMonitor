var URLModel = require('../schema/createSchema.js');

var URL = {
  insertURL: function(url) {
    return new Promise(function(resolve, reject) {
      // to generate a random id between 1 to 1000
      url._id = Math.floor(Math.random() * (10000) + 1);

      URLModel().then(function(model) {
        var newURL = new model(url);
        newURL.save(function(err, newURL) {
          if (err)
            reject(err);
          else
            resolve(newURL);
        });
      });
    });
  },
};

module.exports = URL;
