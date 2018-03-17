module.exports = (db) => {
  return {
    create: (communityDetails, cb) => {
      let newCommunity = new db.model.Community({
        name: communityDetails.name,
        contactNumber: communityDetails.number,
        location: {
          longitude: communityDetails.longitude,
          latitude: communityDetails.latitude
        },
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
      db.model.Community.findOne({ _id, id}, (err, target) => {
        if(err){ cb(err); return }
        cb(null, target)
      })
    },
    getAll: (cb) => {
      db.model.Community.find((err, communties) => { cb(err, communties) })
    }
  }
}
