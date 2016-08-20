var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/logout', isLoggedIn,function (req, res, next) {
    req.logout();
    res.redirect('/');
});


router.get('/', isLoggedIn, function(req, res, next) {
    console.log(req.isAuthenticated() +  ' :valor');
    res.render('operario/dash_operario', { title: 'Bienvenido' });

});


router.use('/', notLoggedIn, function (req, res, next) {
    next();
});
router.get('/crearNuevo', function(req, resp, next){
    var password="1234";
    var nombre= req.param("inputNombre");
    var apellidos= req.param("inputApellidos");
    var cedula= req.param("inputCedula");
    var mail = req.param("inputMail");
    console.log(password);
    console.log(nombre);
    console.log(apellidos);
    console.log(cedula);
    //validar que el mail ya no se haya ingresado en la base

    //aqui conecta al schema y los ingresaria

    console.log("Creado Satisfactoriamente");

});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    console.log('sesion del operario, no tiene permiso');
    res.redirect('/');
}


function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;