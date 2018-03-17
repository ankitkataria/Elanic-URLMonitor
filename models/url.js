var mongoose = require('mongoose');
var config = require('../config/config.json');
var urlSchema = require('../schema/urlSchema.js');
var uniqid = require('uniqid');

// making connection to database
mongoose.connect('mongodb://localhost/' + config.mongo.db);

// initializing model
var schema = mongoose.Schema(urlSchema);
var URLModel = mongoose.model('URL', schema);

var URL = {
  insertURL: function(url) {
    return new Promise(function(resolve, reject) {
      // to generate a random hex id
      url._id = uniqid();

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
  retrieveURLs: function(data) {
    return new Promise(function(resolve, reject) {
      URLModel.find(data, function(err, result) {
        if (err)
          reject(err);
        else
          resolve(result);
      });
    });
  },
  deleteAll: function() {
    return new Promise(function(resolve, reject) {
      URLModel.remove({}, function(err, result) {
        if (err)
          reject(err);
        else
          resolve(result);
      });
    });
  },
};

module.exports = URL;
