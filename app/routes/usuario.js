var express = require('express');
var router = express.Router();
var passport = require('passport');



router.get('/logout', isLoggedIn,function (req, res, next) {
    req.logout();
    res.redirect('/');
});


//vistas usuario
router.get('/', isLoggedIn, function(req, res, next) {
    console.log(req.isAuthenticated() +  ' :valor');
    res.render('usuario/dash_user', { title: 'Bienvenido' });

});

router.get('/perfil', isLoggedIn, function (req, res, next) {
    //if (req.session.rol == "cliente")
    console.log(req.isAuthenticated() +  ' :valor');
    res.render('usuario/perfil_user', {title: 'Mi Perfil'});
});


router.get('/examenes', isLoggedIn, function(req, res, next) {
    res.render('usuario/examenes_user', { title: 'Mis Examenes' });
});


router.get('/centros-medicos', isLoggedIn, function(req, res) {
        res.render('usuario/centros_medicos', { title: 'Centros Medicos'});
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