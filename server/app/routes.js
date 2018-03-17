module.exports = (app, passport, db) => {

  const people    = require('./people.js')(db);
  const product   = require('./product.js')(db);
  const user      = require('./user.js')(db);
  const community = require('./community.js')(db);

  // Index root
  app.get('/', (req,res) => {
    people.getFeatured((err, featuredPeople) => {
      if(err) { res.send(err); return }
      product.getFeatured((err,featuredProduct) => {
        if(err) { res.send(err); return }
        if(!req.user){
          res.render("home",{
            user: req.user,
            people: featuredPeople,
            products: featuredProduct,
          });
          return;
        }
        user.getBasketTotal(req.user, (err, total) => {
          if(err){ res.send(err); return }
          req.user.basketTotal = total;
          res.render("home",{
            user: req.user,
            people: featuredPeople,
            products: featuredProduct,
          });
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

  app.get('/browse', (req,res) => {
    if(!user.req){
      res.render('browse', {
        user: req.user,
      })
    } else {
      user.getBasketTotal(req.user, (err, total) => {
        if(err){ res.send(err); return }
        req.user.basketTotal = total;
        res.render('browse', {
          user: req.user,
        })
      })
    }
  })

  app.post('/create/community', (req, res) => {
    community.create(req.body, err => {
      if(err) { res.send(err); return; }
      res.redirect('/')
    })
  })

  app.post('/create/product', (req, res) => {
    product.create(req.body, err => {
      if(err) { res.send(err); return; }
      res.redirect('/');
    })
  })

  app.post('/create/person', (req, res) => {
    people.create(req.body, err => {
      if(err){ res.send(err); return }
      res.redirect('/')
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

  app.get('/register', (req,res) => {
    if(!req.user){
      res.render('register', {});
    } else {
      res.redirect('/');
    }
  })

  app.post('/product/search', (req, res) => {
    product.search(req.body.searchTerm, (err,results) => {
      if(err) { res.send(err); return }
      res.send(results);
    })
  })

  app.post('/community/search', (req, res) => {
    community.search(req.body.searchTerm, (err,results) => {
      if(err) { res.send(err); return }
      res.send(results);
    })
  })
}
