module.exports = new require('mongoose').Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    required: false
  }
});
