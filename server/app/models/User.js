var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = new require('mongoose').Schema({
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: "String",
    enum: ['Crafter','Patron'],
    required: true
  },
  contact: {
    type: "String",
    required: true
  },
  basket: [{
    product: {
      type: Schema.ObjectId,
      ref: "Product"
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  basketTotal: {
    type: Number,
    required: true
  }
});
