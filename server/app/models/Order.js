var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = new require('mongoose').Schema({
  status: {
    type: Schema.ObjectId,
    ref: "Status",
    required: true
  },
  items: [{
    quantity: {
      type: Number,
      required: true
    },
    product: {
      type: Schema.ObjectId,
      ref: "Product",
      required: true
    }
  }]
})
