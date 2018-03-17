module.exports = new require('mongoose').Schema({
  name: {
    type: String,
    required: true
  },
  update: [{
    type: String,
    require: true
  }]
});
