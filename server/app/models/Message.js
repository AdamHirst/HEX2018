var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = new require('mongoose').Schema({
  messageSID: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  order: {
    type: Schema.ObjectId,
    ref: "Order",
  },
  timestamp: {
    type: Date
  }
})
