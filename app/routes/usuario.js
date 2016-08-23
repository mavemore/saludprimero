var express = require('express');
var router = express.Router();
var passport = require('passport');
var Centro = require('../models/modCentro');
var Examen = require('../models/modExamen.js');
var UserInfo = require('../models/modUsuario.js');


router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/user/signin');
});


//vistas usuario
router.get('/', isLoggedIn, function(req, res, next) {
    console.log(req.isAuthenticated() +  ' :valor');
    res.render('usuario/home', { title: 'Bienvenido' });

});

router.get('/perfil', isLoggedIn, function(req, res, next) {
    UserInfo.find({email:req.session['email']},{},function(e,userinf){//aqui se debe hacer el query para seleccionar solo la info del usuario que esta en sesion
        res.render('usuario/perfil_user',{
            title: 'Mi Perfil',
            usuarioInfoList : userinf
        });
    });
});

router.post('/perfil/editUser', function(req, res, next){
    UserInfo.update({email:req.session['email']}, {
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      cedula: req.body.cedula,
      email: req.body.email,
      dir: req.body.direccion,
      telf: req.body.telefono
    },
    function(err){
      res.redirect('/usuario/perfil');
    });
});

router.get('/examenes', isLoggedIn, function(req, res, next) {
    //res.render('usuario/examenes_user', { title: 'Mis Examenes' });//cargar examenes de la bbdd
    Examen.find(function(err, list){
        res.render('usuario/examenes_user', {
            title: 'SaludPrimero | Mis Exámenes',
            examenes: list
        });
    });
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

router.get('/centros-medicos/list', isLoggedIn, function(req, res) {
  //res.render('usuario/centros_medicos', { title: 'Centros Medicos' });
  Centro.find(function(err, centros){
    res.send(centros);
  });  
});



router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

function isLoggedIn(req, res, next) {
    console.log("baia baia: " + req.session.rol);
    if (req.isAuthenticated() && req.session.rol === "cliente"){
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