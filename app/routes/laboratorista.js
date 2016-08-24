var express = require('express');
var router = express.Router();
var passport = require('passport');
var Examen = require('../models/modExamen.js');

router.get('/logout', isLoggedIn,function (req, res, next) {
    req.logout();
    res.redirect('/');
});


router.get('/', isLoggedIn, function(req, res, next) {
    console.log(req.isAuthenticated() +  ' :valor');
    res.render('laboratorista/homeLab', { title: 'Bienvenido' });

});

router.get('/recepcion-muestras',isLoggedIn, function(req, res, next) {
    Examen.find({estado: "Pendiente"},function(err, list){
    res.render('laboratorista/recepcion_muestra', { 
      title: 'Recepcion de Muestras', 
      examenes: list
    });
  }); 
});

router.post('/recepcion-muestras/notificar',isLoggedIn, function(req, res, next) {
   //Hay que cambiar el estado de la muestra que tenga ese codigo por "Cancelada"
   console.log("notificando "+req.body.codigo);
});

router.post('/recepcion-muestras/recibir',isLoggedIn, function(req, res, next) {
   //Hay que cambiar el estado de la muestra que tenga ese codigo por "Cancelada"
   console.log("recibido "+req.body.codigos);
});


router.get('/ingreso-resultados', isLoggedIn, function(req, res, next) {
    Examen.find({estado: "En Espera"},function(err, list){
    res.render('laboratorista/ingreso_resultados', { 
      title: 'Ingreso de Resultados de Muestras', 
      examenes: list
    });
  }); 
});

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() && req.session.rol === "laboratorista" ){
        return next();
    }
    console.log('sesion del laboratorista, no tiene permiso');
    res.redirect('/');
}


function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;