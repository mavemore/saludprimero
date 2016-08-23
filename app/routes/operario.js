var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user_login');
var Paciente = require('../models/paciente');



router.get('/logout', isLoggedIn,function (req, res, next) {
    req.logout();
    res.redirect('/');
});


router.get('/', isLoggedIn, function(req, res, next) {
    console.log(req.isAuthenticated() +  ' :valor');
    res.render('operario/dash_operario', { title: 'Bienvenido' });

});

router.get('/pacientes', isLoggedIn, function(req, res, next) {
    res.render('operario/admin_pacientes', { title: 'Administrar Pacientes' });
});

router.get('/ingreso-muestras', isLoggedIn, function(req, res, next) {
    var messages = req.flash('error');
    res.render('operario/ingreso_muestra', { title: 'Ingreso de Muestras', messages: messages, hasErrors: messages.length > 0});
    //res.render('operario/ingresomuestra');
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

router.post('/ingreso-muestras/nuevaMuestra', function (req, res) {

    console.log("POST muestra");

});
router.post('/ingreso-muestras/nuevo',  function (req, res, done) {
        console.log("POST:" + req.param('emailP'));
        var email = req.param('emailP');
        var errors = req.validationErrors();
        if(errors){
            var messages = [];
            console.log("holi error");
            errors.forEach(function (error) {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }

        User.findOne({'email': email}, function (err, user) {
            if(err){
                console.log("Error");
                return done(err);
                //return handleError(err);
            }
            if(user){
                console.log("Email en uso, use otro");
                return done(null, false, {message: 'Email is already in use'});
                //return res.redirect('/operario/ingreso-muestras');
            }
            var newUser = new User();
            newUser.email = email;
            newUser.password= newUser.encryptPassword("1234");
            newUser.rol = "cliente";
            newUser.save(function (err, result) {
                if(err){
                    return done(err);
                }
                //return done(null, newUser);
                console.log("Estamos en pacientes");
                var paciente = new Paciente();
                paciente.user = newUser._id;
                paciente.nombres = req.param('nombreP');
                paciente.apellidos = req.param('apellidoP');
                paciente.cedula = req.param('cedulaP');
                
                paciente.save(function (err) {
                    if (err) return handleError(err);
                    console.log("funciona!");
                });

            });
        });
        res.redirect('/operario/ingreso-muestras');
    }
);


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
/*
router.use('/', notLoggedIn, function (req, res, next) {
    next();
});
*/
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