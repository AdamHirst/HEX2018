const stripe = require('stripe')('sk_test_1Lt3bLanoUVKW7iHVNygqFo4')

module.exports = () => {
  return {
    makePayment: (amount, stripeToken, cb) => {
      const charge = {
  	    amount: amount,
  	    currency: 'eur',
  	    card: stripeToken
      }

      stripe.charges.create(charge, (err, res) => {
        if(err){ cb(err); return }
        cb(null)
      })
    }
  }
}
