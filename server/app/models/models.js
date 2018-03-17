const mongoose = require("mongoose");

module.exports = {
	User: mongoose.model("User", require("./User.js")),
  Community: mongoose.model("Community", require('./Community.js')),
  Person: mongoose.model("Person", require('./Person.js')), // Not a user, to tell a personal story
  Product: mongoose.model("Product", require('./Product.js')),
  Order: mongoose.model("Order", require('./Order.js')),
  Status: mongoose.model("Status", require('./Status.js')),
  Conversation: mongoose.model("Conversations", require('./Conversations.js')),
  Message: mongoose.model("Message", require('./Message.js'))
};
