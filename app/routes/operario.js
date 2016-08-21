var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/logout', isLoggedIn,function (req, res, next) {
    req.logout();
    res.redirect('/');
});


router.get('/', isLoggedIn, function(req, res, next) {
    console.log(req.isAuthenticated() +  ' :valor');
    res.render('operario/homeOpe', { title: 'Bienvenido' });

});

router.get('/pacientes', isLoggedIn, function(req, res, next) {
    res.render('operario/admin_pacientes', { title: 'Administrar Pacientes' });
});

router.get('/ingreso-muestras', isLoggedIn, function(req, res, next) {
    res.render('operario/ingreso_muestra', { title: 'Ingreso de Muestras' });
});

router.get('/muestras', isLoggedIn,function(req, res, next) {
    res.render('operario/admin_muestra', { title: 'Administrar Muestras' });
});

router.get('/muestras/editar', isLoggedIn, function(req, res, next) {
    res.render('operario/editar_muestra', { title: 'Editar Muestra' });
});

router.get('/reportes', isLoggedIn, function(req, res, next) {
    res.render('operario/generar_reportes', { title: 'Generacion de Reportes' });
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

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

function isLoggedIn(req, res, next) {
    console.log(req.session.rol);
    if (req.isAuthenticated() && req.session.rol === "operario"){
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