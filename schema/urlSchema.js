const urlSchema = {
  _id: {type: String, index: true},
  url: String,
  method: String,
  headers: Object,
  data: Object,
  responses: {type: Array, default: []},
};

module.exports = urlSchema;
