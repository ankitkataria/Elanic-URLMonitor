const mongoose = require('mongoose');
const config = require('../config/config.json');
const urlSchema = require('../schema/urlSchema.js');
const uniqid = require('uniqid');

// making connection to database
mongoose.connect('mongodb://localhost/' + config.mongo.db);

// initializing model
const schema = mongoose.Schema(urlSchema);
const URLModel = mongoose.model('URL', schema);

const URL = {
  insertURL: function(url) {
    return new Promise(function(resolve, reject) {
      // to generate a random hex id
      url._id = uniqid();

      let newURL = new URLModel(url);
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
      URLModel.find(data)
        .lean()
        .exec(function(err, result) {
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
