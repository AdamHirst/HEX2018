module.exports = new require('mongoose').Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    }
  }
});
