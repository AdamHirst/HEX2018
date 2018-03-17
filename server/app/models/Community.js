var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = new require('mongoose').Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    }
  },
  people: [{
    type: Schema.ObjectId,
    ref: "Person",
    required: false
  }],
  products: [{
    type: Schema.ObjectId,
    ref: "Product",
    required: false
  }]
});
