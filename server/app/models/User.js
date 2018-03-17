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
    enum: ['Craftor','Patron'],
    required: true
  },
  phone: {
    type: "String",
    required: false
  }
});
