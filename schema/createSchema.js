var mongoose = require('mongoose');
var config = require('../config/config.json');

mongoose.connect('mongodb://localhost/' + config.mongo.db);

var createSchema = function() {
  return new Promise(function(resolve, reject) {
    var urlSchema = mongoose.Schema({
      _id: Number,
      url: String,
      headers: Object,
      data: Object,
    });
    var URLModel = mongoose.model('URL', urlSchema);
    resolve(URLModel);
  });
};

module.exports = createSchema;
