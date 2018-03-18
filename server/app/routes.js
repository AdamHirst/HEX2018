module.exports = (app, passport, db, twilio) => {

  const people    = require('./people.js')(db);
  const product   = require('./product.js')(db);
  const user      = require('./user.js')(db);
  const community = require('./community.js')(db);
  const basket    = require('./basket.js')(db, twilio);

  function auth(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }

  // Index root
  app.get('/', (req,res) => {
    people.getFeatured((err, featuredPeople) => {
      if(err) { res.send(err); return }
      product.getFeatured((err,featuredProduct) => {
        if(err) { res.send(err); return }
        res.render("home",{
          'user': req.user,
          people: featuredPeople,
          products: featuredProduct,
        });
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
    res.render('browse', {
      'user': req.user,
    })
  })

  app.get('/about', (req,res) => {
    community.getAll((err, communities) => {
      if(err){ res.send(err); return }
      res.render('about', {
        'user': req.user,
        'communities': communities
      })
    })
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
      res.render("login", { error: req.flash('error') });
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
      res.render('register', { error: '' });
    } else {
      res.redirect('/');
    }
  });

  app.get('/product/add', auth, (req, res) => {
    community.getAll((err, communities) => {
      res.render('product/add', {
        user: req.user,
        error: req.flash('error'),
        'communities': communities
      });
    })
  });

  app.get('/people/add', auth, (req, res) => {
    community.getAll((err, communities) => {
      res.render('people/add', {
        user: req.user,
        error: req.flash('error'),
        'communities': communities
      });
    })
  });

  app.get('/community/add', auth, (req, res) => {
    res.render('community/add', {
      user: req.user,
      error: req.flash('error'),
    });
  });

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

  app.get('/community/:id', (req, res) => {
    community.get(req.params.id, (err, target) => {
      if(err){ res.send(err); return }
      res.render('community',{
        'user': req.user,
        community: target
       })
    })
  })

  app.get('/person/:id', (req, res) => {
    person.get(req.params.id, (err, target) => {
      if(err){ res.send(err); return }
      res.render('person',{
        'user': req.user,
        person: target
       })
    })
  })

  app.get('/product/:id', (req, res) => {
    product.get(req.params.id, (err, target) => {
      if(err){ res.send(err); return }
      res.render('product/view',{
        'user': req.user,
        product: target
       })
    })
  })

  app.post('/basket/add', auth, (req, res) => {
    basket.add(req.user, req.body.productId, req.body.quantity, err => {
      if(err) { res.send(err); return; };
      res.redirect('/');
    })
  })

  app.get('/basket', auth, (req, res) => {
    db.model.User.findOne( { _id: req.user._id } )
    .populate('basket.product')
    .exec((err,user)=>{
      res.render('basket', { 'user': user });
    })
  })

}
