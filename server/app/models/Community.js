var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = new require('mongoose').Schema({
  name: {
    type: String,
    required: true
  },
  contactNumber: {
    type: Number,
    required: true
  },
  description: {
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
  image: {
    type: String,
    require:true
  }
});
