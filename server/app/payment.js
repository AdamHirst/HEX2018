const stripe = require('stripe')('sk_test_1Lt3bLanoUVKW7iHVNygqFo4')

module.exports = () => {
  return {
    makePayment: (amount, stripeToken, user, cb) => {
      const charge = {
  	    amount: amount*100, // to convert to eurocents
  	    currency: 'eur',
  	    card: stripeToken,
        customer: "cus_CVw5rJOkIhsq8U"
      }

      stripe.charges.create(charge, (err, res) => {
        if(err){ cb(err); return }
        cb(null)
      })
    }
  }
}
