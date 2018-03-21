const mongoose = require('mongoose');
const db = require('./app/database.js')(mongoose);

/**
  * Community
  */
db.model.Community.remove({}, (err) => {
  if (err) console.log(err);
  console.log("Community Removed");
});

/**
  * Person
  */
db.model.Person.remove({}, (err) => {
  if (err) console.log(err);
  console.log("Person Removed");
});

/**
  * Product
  */
db.model.Product.remove({}, (err) => {
  if (err) console.log(err);
  console.log("Product Removed");
})

/**
  * User
  */
db.model.User.remove({}, (err) => {
  if (err) console.log(err);
  console.log("User Removed");
});

/**
  * Order
  */
db.model.Order.remove({}, (err) => {
  if (err) console.log(err);
  console.log("Order Removed");
});

/**
  * Order
  */
db.model.Message.remove({}, (err) => {
  if (err) console.log(err);
  console.log("Message Removed");
});


return;
