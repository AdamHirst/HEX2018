var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = new require('mongoose').Schema({
  messages: [{
    type: Schema.ObjectId,
    ref: "Message",
    required: true
  }]
})
