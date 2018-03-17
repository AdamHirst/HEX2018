module.exports = (db) => {
  return {
    create: (userDetails, cb) => {
      require('./password.js').generateHash(userDetails.password, (err, hash) => {
        let newUser = new db.model.User({
          name: userDetails.name,
          email: userDetails.email,
          type: "Patron",
          password: hash,
          contact: userDetails.contact
        });

        newUser.save(err => {
          if(err){ cb(err); return }
          cb()
        })
      })
    },
    getBasketTotal: (user, cb) => {
      db.model.User.findOne({ _id : user._id })
      .populate({
        path: "basket",
        populate: {
          path: "product",
          select: "price"
        }
      }).exec((err, user) => {
        if(err){ cb(err); return }
        let basketTotal = 0;
        user.basket.forEach(current => {
          basketTotal += current.quantity * current.product.price;
        })
        cb(null, basketTotal);
      })
    }
  }
}
