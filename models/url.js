var mongoose = require('mongoose');
var config = require('../config/config.json');
var urlSchema = require('../schema/urlSchema.js');

// making connection to database
mongoose.connect('mongodb://localhost/' + config.mongo.db);

// initializing model
var schema = mongoose.Schema(urlSchema);
var URLModel = mongoose.model('URL', schema);

var URL = {
  insertURL: function(url) {
    return new Promise(function(resolve, reject) {
      // to generate a random id between 1 to 1000
      url._id = Math.floor(Math.random() * (100000) + 1);

      var newURL = new URLModel(url);
      newURL.save(function(err, newURL) {
        if (err)
          reject(err);
        else
          resolve(newURL);
      });
    });
  },
  deleteURL: function(id) {
    return new Promise(function(resolve, reject) {
      URLModel.remove({_id: id}, function(err, result) {
        if (err)
          reject(err);
        else
          resolve(result);
      });
    });
  },
  updateURL: function(id, data) {
    return new Promise(function(resolve, reject) {
      URLModel.update({_id: id}, data, function(err, result) {
        if (err)
          reject(err);
        else
          resolve(result);
      });
    });
  },
  retrieveURL: function(id) {
    return new Promise(function(resolve, reject) {
      URLModel.find({_id: id}, function(err, result) {
        if (err)
          reject(err);
        else
          resolve(result);
      });
    });
  },
};

module.exports = URL;
