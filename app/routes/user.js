var express = require('express');
var router = express.Router();
//oscar
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('user/profile');
});

router.get('/logout', isLoggedIn,function (req, res, next) {
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn, function (req, res, next) {
  next();
});

router.get('/signup', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});


router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/signin', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});


router.post('/signin', passport.authenticate('local.signin', {
  //successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}), function (req, res) {
  if (req.param('rol') === 'cliente'){
    console.log("opcion:" + req.param('rol'));
    console.log("body:" + req.body.rol);
    console.log('vista clientes');
    req.session['email'] = req.param('email');
    console.log(req.session['email']);
    //res.redirect('/dashboard/usuario');
    res.redirect('/usuario?qs1=cliente');
  }
  else if (req.param('rol') === 'operario'){
    console.log("opcion:" + req.param('rol'));
    console.log("body:" + req.body["rol"]);
    console.log("params:" + req.params["rol"]);
    console.log('vista operarios');
    //res.redirect('/dashboard/operario');
    res.redirect('/operario');
  }
  else {
    console.log("opcion:" + req.param('rol'));
    console.log("body:" + req.body["rol"]);
    console.log("params:" + req.params["rol"]);
    console.log('vista laboratorista');
    //res.redirect('/dashboard/laboratorista');
    res.redirect('/laboratorista');
  }
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  console.log('No ha iniciado sesion, no puede ingresar');
  res.redirect('/');
}


function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()){
    return next();
  }
  console.log('sesion activa ...debe salir');
  res.redirect('/');
}


module.exports = router;
