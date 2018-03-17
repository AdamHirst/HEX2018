module.exports = db => {
  return {
      getFeatured: (cb) => {
        db.model.Product.find({ featured: true })
          .exec((err,products) => {
            if(err) return err;
            cb(null, products);
          })
      },
      create: (productDetails, cb) => {
        let newProduct = new db.model.Product({
          name: productDetails.name,
          description: productDetails.description,
          price: productDetails.price
        });
        newProduct.save(err => {
          if(err){ cb(err); return }
          cb(null);
        })
      },
      search: (searchTerm, cb) => {
        db.model.Product.find({ name: { "$regex": searchTerm, "$options": "i" } }, (err, results) => {
          if(err){ cb(err); return }
          cb(null, results)
        })
      }
  }
}
