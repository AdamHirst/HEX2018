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
        price: productDetails.price,
        image: productDetails.image,
        community: productDetails.community
      });
      newProduct.save(err => {
        if(err){ cb(err); return }
        cb(null);
      })
    },
    search: (searchTerm, cb) => {
      let results = [];
      db.model.Product.find( {}, (err, allProducts) => {
        allProducts.forEach(current => {
          console.log(current)
          if(current.name.toLowerCase().includes(searchTerm.toLowerCase())){
            results.push(current);
          }
        })
        if(err){ cb(err); return }
        cb(null, results)
      })
    },
    get: (id, cb) => {
      db.model.Product.findOne({ _id: id})
                      .populate('community')
                      .exec((err, target) => {
        if(err){ cb(err); return }
        cb(null, target)
      })
    }
  }
}
