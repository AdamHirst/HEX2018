module.exports = db => {
  return {
    getFeatured: (cb) => {
      db.model.Person.find({ featured: true })
        .populate({
          path: "community",
          select: "name location image"
        })
        .exec((err,people) => {
          if(err) return err;
          cb(null, people);
        })
    },
    create: (personDetails, cb) => {
      let newPerson = new db.model.Person({
        name: personDetails.name,
        story: personDetails.story,
        community: personDetails.community,
        image: personDetails.image
      })
      newPerson.save(err => {
        if(err){ cb(err); return }
        cb(null);
      })
    },
    get: (id, cb) => {
      db.model.Person.findOne({ _id: id})
                     .populate('community')
                     .exec((err, target) => {
        if(err){ cb(err); return }
        cb(null, target)
      })
    }
  }
}
