module.exports = (app, passport, db) => {

  // Index root
  app.get('/', (req,res) => {
    res.render("index",{ user: req.user })
  });

  // Login Route
  app.get('/login', (req,res) => {
    if(req.user){
      res.redirect('/');
    } else {
      res.render("login", {});
    }
  })

  // Logout Route
  app.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/')
  })
}
