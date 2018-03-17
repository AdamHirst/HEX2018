module.exports = new require('mongoose').Schema({
  message: {
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
  timeStamp: {
    type: String,
    require: true
  }
});
