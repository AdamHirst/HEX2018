const mongoose = require('mongoose');
const db = require('./app/database.js')(mongoose);

/**
  * Community
  */
var community1 = new db.model.Community({
  name: "Mashuuru",
  contactNumber: "+447412939773",
  description: "Mahuuru town is a small shopping centre in Kjiado County in the Greater Rift Valley Province in Kenya. It is located about 70 Kilometers South East of Kajiado Town which is the Administrative town of Kajiado County. Mashuuru started at around 1940's before independence and during the colonial time. It is currently the Headquarters of Mashuuru Sub County. Its catchment Population (Mashuuru District) is about 35,666.",
  location: {
    latitude: "-2.105494",
    longitude: "37.130301"
  },
  image: "https://pbs.twimg.com/media/DWARUGKW4AAGt1P.jpg"
});

community1.save();

var community2 = new db.model.Community({
  name: "Gangadevipalli, Andhra Pradesh",
  contactNumber: "+447412939773",
  description: "Gangadevi is a village in Geesugonda mandal of Warangal Rural district in the Indian state of Telangana. It is situated about 12 km away from the district headquarters of Warangal and has a population of 1277.",
  location: {
    latitude: "17.954722",
    longitude: "79.714444"
  },
  image: "https://www.thebetterindia.com/wp-content/uploads/2017/02/gallery21380.jpg"
});

community2.save();

/**
  * Person
  */
var person1 = new db.model.Person({
  name: "Samuel",
  story: "In need of Pepsi Max",
  featured: true,
  image: "https://blog.unbound.org/wp-content/uploads/2013/11/IMG_1857.jpg",
  community: community1
});

person1.save();

var person2 = new db.model.Person({
  name: "Erick",
  story: "In need of Pepsi Max",
  featured: true,
  image: "http://4.bp.blogspot.com/-w6de6oHXWTc/UYoPTSchYpI/AAAAAAAAVuw/W9Dhkj-Bqo4/s1600/kenyan+man.jpg",
  community: community1
});

person2.save();

var person3 = new db.model.Person({
  name: "Isabel",
  story: "In need of Pepsi Max",
  featured: true,
  image: "https://i.ytimg.com/vi/8a6eVgFPvzw/maxresdefault.jpg",
  community: community1
});

person3.save();

/**
  * Product
  */
var product1 = new db.model.Product({
  name: "Olive Tree Wooden Bowl",
  description: "Made from local Olive Tree wood, this unique bowl features an embedded cow bone design.",
  featured: true,
  image: "http://www.denurcrafts.org/wp-content/uploads/2016/05/Denur-wooden-curving-126.jpg",
  price: 12,
  community: community1
});

product1.save();

var product2 = new db.model.Product({
  name: "Brass pendant charm necklace",
  description: "A unisex neckname featuring a sulpted brass crab pendant. Made with recyled glass, coconut shells and is suitable for everyday use.",
  featured: true,
  image: "http://www.denurcrafts.org/wp-content/uploads/2016/05/Denur-wooden-curving-129.jpg",
  price: 19,
  community: community1
});

product2.save();

var product3 = new db.model.Product({
  name: "Bone Tea Spoons Set",
  description: "This bespoke handcrafted cow bone spoon set is the perfect addition to your kitchen!",
  featured: true,
  image: "http://www.denurcrafts.org/wp-content/uploads/2016/05/Denur-Bone-Curving-102.jpg",
  price: 8,
  community: community1
});

product3.save();

var product4 = new db.model.Product({
  name: "Calming Angels",
  description: "These handcrafted Soapstone calming angels provide you with a positive energy and calming influence with the natural properties of Soapstone. Whenever you feel stressed or overwhelmed hold them in the palm on your hand and they can calm and prepare you for anything.",
  featured: false,
  image: "http://www.denurcrafts.org/wp-content/uploads/2016/09/Denur-Soap-stone-132.jpg",
  price: 7.50,
  community: community1
});

product4.save();

var product5 = new db.model.Product({
  name: "Wooden Photo Frame",
  description: `This rustic and high quality unique photo frame will provide an eye catching arrangement in your home for your most precious photos. Each photo frame is 4" x 6" but comes with unique surrounding patterns.`,
  featured: false,
  image: "http://www.craftshopsindia.com/images/product-images/st1971-71733_1.JPG",
  price: 7,
  community: community2
});

product5.save();

var product6 = new db.model.Product({
  name: "5 Piece Bird Plate Set",
  description: `These high quality and hand painted ceramic wall plates will add a pop to your home. Each plate is 10 inches in diameter and come with an attached fixture on the rear.`,
  featured: true,
  image: "http://www.craftshopsindia.com/images/product-images/st1910-70403_1.jpg",
  price: 50,
  community: community2
});

var product6 = new db.model.Product({
  name: "Marble Flower Vase",
  description: `This stunning hand carved vase will be the perfect decoration for your home and is ideal for flowers and dried arrangements. `,
  featured: true,
  image: "http://www.craftshopsindia.com/images/product-images/st1984-71738_1.jpg",
  price: 50,
  community: community2
});

product6.save();


/****
*****/

var product6 = new db.model.Product({
  name: "Collar Necklace",
  description: "This beautiful full collar necklace fits comfortable across your neck, covering your collar bone while not choking. The necklace is able to provide a modern, yet local athetitic to give you a sophisticated finish to your look. The red & blue colour across the necklace is contructed from upcycled glass.",
  featured: false,
  image: "http://www.denurcrafts.org/wp-content/uploads/2016/10/7-Denur-Necklaces-157.jpg",
  price: 30,
  community: community2
});

product6.save();

/**
  * User
  */
var user = new db.model.User({
  password: "password",
  email: "adam@example.com",
  name: "Adam 'VHacks' Hirst",
  type: "Patron",
  contact: "34567890",
});

user.save();

/**
  * Order
  */
var order = new db.model.Order({
  orderNumber: "12345",
  quantity: 1,
  product: product1,
  customer: user,
  status: "Processing"
});

order.save();
