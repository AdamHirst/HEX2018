const bcypt = require('bcrypt')

module.exports = (db) => {
  return {
    add: (user, productId, quantity) => {
      db.model.User.update({ _id: user._id },{ $push: { basket: {
        product: productId,
        'quantity': quantity
      } } }, err => {
        cb(err)
      })
    },
    complete: (user, cb) => {
      db.model.User.findOne({ _id: user._id })
      .populate({
        path: "basket",
        populate: {
          path: "product",
          select: "name price"
        }
      }).exec((err, user) => {
        let orders = [];
        let status = [];
        for(let i=0; i<user.basket.length;i++){
          current = user.basket[i];
          let newID = user.email + Date.now() + current.product.name;
          let salt = bcrypt.genSaltSync(5);
          newID = bcrypt.hashSync(newID, salt);
          orders.push({
            orderNumber: newID,
            quantity: current.quantity,
            product: current.product,
            customer: user._id,
            status: "Processing"
          })
        };

        try {
          db.model.Order.insertMany(orders);
          cb(null)
        } catch(e) {
          cb(e)
        }
      })
    }
  }
}
