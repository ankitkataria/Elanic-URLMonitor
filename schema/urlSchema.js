var urlSchema = {
  _id: Number,
  url: String,
  method: String,
  headers: Object,
  data: Object,
  responses: {type: Array, default: []},
};

module.exports = urlSchema;
