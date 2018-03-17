// Test Credentials
const accountSID = "AC4cf113b590211dbd3f7412cf98839446";
const authToken = "6a15dcb9d4287aca8b6da25d381d2aa2";

// Live Credentials
// const accountSID = "ACdcc80bff21eb2531213430a9bfeeda0c";
// const authToken = "8aa1635b0eabcd93cac79970e3d07706";

const client = require('twilio')(accountSID, authToken);

module.exports = (db) => {



  return {

    sendText: (to, body) => {
      client.messages.create({
        to: to,
        from: '+18339883083',
        body: body
      }).then(message =>  console.log(message.sid));

      return;

    }

    sendProductOrderNotice: (productName, orderNumber, community) => {
      var body = `We've got a new order for you! (#${orderNumber}). \n Can you craft a ${productName} to be collected?`;

      // Trim the text size to 160 to avoid additional SMS costs
      if (body.length => 160) {
        var difference = 160 - body.length ;
        productName.substring(0, productName.length - difference);
      }

      this.sendText(community.contactNumber, body);
    },

  }


}
