// Test Credentials
// const accountSID = "AC4cf113b590211dbd3f7412cf98839446";
// const authToken = "6a15dcb9d4287aca8b6da25d381d2aa2";

// Live Credentials
const accountSID = "ACdcc80bff21eb2531213430a9bfeeda0c";
const authToken = "8aa1635b0eabcd93cac79970e3d07706";

const client = require('twilio')(accountSID, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const from = '+3197004498474';
const confirmationWords = ['yes', 'ye', 'yea', 'yeah', 'okay', 'ok', 'accept', 'approve', 'good'];

module.exports = (app, db) => {

  app.post("/twilio", (req, res) => {
    var fromCrafter = req.body.From;
    var message = req.body.Body;

    if(confirmationWords.includes(message)) {

      db.model.Message.findOne({to: fromCrafter}, (err, message) => {

        db.model.Order.findOneAndUpdate({_id: message.order}, {$set: {status: "Crafting"}}, (err, order) =>{
          if (err) throw err;

          const twiml = new MessagingResponse();

          twiml.message('Great! We will let you know when we can collect soon!');

          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
        });

      });

    }


  });

  return {

    sendProductOrderNotice: (order) => {

      db.model.Product.findOne({_id: order.product})
        .populate('community')
        .exec((err, product) => {

          var body = `We've got a new order for you! (#${order.orderNumber}). \nCan you craft a ${product.name} to be collected?`;

          // Trim the text size to 160 to avoid additional SMS costs
          if (body.length >= 160) {
            var difference = 160 - body.length ;
            productName.substring(0, product.name.length - difference);
          }

          // console.log(community.contactNumber);
          // console.log(body);

          client.messages.create({
            to: product.community.contactNumber,
            from: from,
            body: body
          }).then(message => {

            // Create a new Conversation
            var newMessage = new db.model.Message({
              messageSID: message.sid,
              to: message.to,
              from: message.from,
              order: order,
              timestamp: message.DateCreated
            });

            newMessage.save();

          });

        });

    },

  }


}
