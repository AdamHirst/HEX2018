module.exports = (db) => {
  return {
    create: (communityDetails, cb) => {
      let newCommunity = new db.model.Community({
        name: communityDetails.name,
        contactNumber: communityDetails.contactNumber,
        location: {
          longitude: communityDetails.longitude,
          latitude: communityDetails.latitude
        },
        description: communityDetails.description,
        image: communityDetails.image
      })
      newCommunity.save(err => {
        if(err){ cb(err); return }
        cb(null);
      })
    },
    search: (searchTerm, cb) => {
      db.model.Community.find({ name: { "$regex": searchTerm, "$options": "i" } }, (err, results) => {
        if(err){ cb(err); return }
        cb(null, results)
      })
    },
    get: (id, cb) => {
      db.model.Community.findOne({ _id: id}, (err, target) => {
        if(err){ cb(err); return }
        cb(null, target)
      })
    },
    getAll: (cb) => {
      db.model.Community.find((err, communities) => { cb(err, communities) })
    }
  }
}
