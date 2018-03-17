var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = new require('mongoose').Schema({
  name: {
    type: String,
    required: true
  },
  update: [{
    type: String,
    required: true
  }],
  featured: {
    type: Boolean,
    required: false
  },
  community: {
    type: Schema.ObjectId,
    ref: "Community",
    required: true
  }
});
