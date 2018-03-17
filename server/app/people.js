module.exports = db => {
  return {
      getFeatured: (cb) => {
        db.model.Person.find({ featured: true })
          .populate({
            path: "community",
            select: "name location"
          })
          .exec((err,people) => {
            if(err) return err;
            cb(null, people);
          })
      }
  }
}
