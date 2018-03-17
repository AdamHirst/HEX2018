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
    }
  }
}
