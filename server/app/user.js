module.exports = (db) => {
  return {
    create: (userDetails, cb) => {
      require('./password.js').generateHash(userDetails.password, (err, hash) => {
        let newUser = new db.model.User({
          name: userDetails.name,
          email: userDetails.email,
          type: "Patron",
          password: hash,
          contact: userDetails.contact,
          basketTotal: 0
        });

        newUser.save(err => {
          if(err){ cb(err); return }
          cb()
        })
      })
    }
  }
}
