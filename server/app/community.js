module.exports = (db) => {
  return {
    create: (communityDetails, cb) => {
      let newCommunity = new db.model.Community({
        name: communityDetails.name,
        contactNumber: communityDetails.number,
        location: {
          longitude: communityDetails.longitude,
          latitude: communityDetails.latitude
        }
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
    }
  }
}
