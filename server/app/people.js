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
      },
      create: (personDetails, cb) => {
        let newPerson = new db.model.Person({
          name: personDetails.name,
          story: personDetails.story,
          community: personDetails.community
        })
        newPerson.save(err => {
          if(err){ cb(err); return }
          cb(null);
        })
      }
  }
}
