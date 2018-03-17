module.exports = (app, passport, db) => {

  const people  = require('./people.js')(db);
  const product = require('./product.js')(db);
  const user    = require('./user.js')(db);

  // Index root
  app.get('/', (req,res) => {
    people.getFeatured((err, featuredPeople) => {
      if(err) { res.send(err); return }
      product.getFeatured((err,featuredProduct) => {
        if(err) { res.send(err); return }
        res.render("index",{
          user: req.user,
          people: featuredPeople,
          products: featuredProduct
        })
      })
    })
  });

  app.post('/create/user', (req,res) => {
    user.create(req.body, err => {
      if(err) { res.send(err); return }
      res.redirect('/');
    })
  })

  // Login Route
  app.get('/login', (req,res) => {
    if(req.user){
      res.redirect('/');
    } else {
      res.render("login", {});
    }
  })

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.'
  }))

  // Logout Route
  app.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/')
  })
}
