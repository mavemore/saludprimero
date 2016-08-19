var express = require('express');
var router = express.Router();
var passport = require('passport');
var Centro = require('../models/modCentros');



router.get('/logout', isLoggedIn,function (req, res, next) {
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

router.get('/centros-medicos', isLoggedIn, function(req, res, next) {
    Centro.find({}, function(err, centros){
        res.render('usuario/centros_medicos', { 
            title: 'SaludPrimero | Centros' 
            centroslist: centros
        });
    });
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