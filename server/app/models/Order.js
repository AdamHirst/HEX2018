var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = new require('mongoose').Schema({
  orderNumber: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  product: {
    type: Schema.ObjectId,
    ref: "Product",
    required: true
  },
  customer: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  address: {
    postcode: {
      type: String,
      required: true
    },
    streetName: {
      type: String,
      required: true
    },
    streetNo: {
      type: String,
      require: true
    }
  },
  status: {
    type: String,
    enum: [
      "Processing", // Inital status
      "Crafting", // The community is now making the product
      "Collection", // The community has made the product
      "Shipping", // The product is in shipping
      "Fufilled" // Order is completed
    ],
    required: true
  },
  timeStamp: { type: Date, default: Date.now },
})
