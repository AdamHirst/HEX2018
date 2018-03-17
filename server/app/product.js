module.exports = db => {
  return {
      getFeatured: (cb) => {
        db.model.Product.find({ featured: true })
          .exec((err,products) => {
            if(err) return err;
            cb(null, products);
          })
      }
  }
}
