var express = require('express');
var router = express.Router();
var passport = require('passport');
var Centro = require('../models/modCentro');



router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

//vistas usuarios
router.get('/', isLoggedIn, function(req, res, next) {
    console.log(req.isAuthenticated() +  ' :valor');
    res.render('usuario/dash_user', { title: 'Bienvenido' });

});

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

router.get('/centros-medicos', isLoggedIn, function(req, res) {
  //res.render('usuario/centros_medicos', { title: 'Centros Medicos' });
  Centro.find(function(err, centros){
    res.render('usuario/centros_medicos', { 
      title: 'SaludPrimero | Centros', 
      centroslist: centros
    });
  });  
});

router.get('/examenes', isLoggedIn, function(req, res, next) {
  res.render('usuario/examenes_user', { title: 'Mis Examenes' });//cargar examenes de la bbdd
});

router.get('/perfil', isLoggedIn, function(req, res, next) {
    modUsuario.find({},{},function(err,user){
        res.render('usuario/perfil_user',{
            title: 'Mi Perfil',
            "usuarioInfoList" : user
        });
    });
  //res.render('usuario/perfil_user', { title: 'Mi Perfil' });***
});

function isLoggedIn(req, res, next) {
    console.log(req.query);
    console.log(req.query.qs1);
    if (req.isAuthenticated()){
        return next();
    }
    console.log('sesion del cliente, no tiene permiso');
    res.redirect('/');
}


function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;