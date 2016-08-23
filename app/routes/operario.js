var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user_login');
var Paciente = require('../models/paciente');

var nodemailer= require('nodemailer');
var Centro= require('../models/modCentro')

// necesita un transporter, aqui esta para enviar desde un gmail
var transporter = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth:{
        user: "saludprimerooperario2016@gmail.com",
        pass: "Sp123456"
    }
});


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


router.post('/pacientes/crearNuevo', function(req, res, next){
    var password="1234";
    var mail="cmanosalvas95@gmail.com";
    var pass="1236";
    /*var nombre= req.param("inputNombre");
    var apellidos= req.param("inputApellidos");
    var cedula= req.param("inputCedula");
    var mail = req.param("inputMail");
    console.log(password);
    console.log(nombre);
    console.log(apellidos);
    console.log(cedula);
    *///validar que el mail ya no se haya ingresado en la base


    //aqui conecta al schema y los ingresaria
    //envia mail al usuario
    /*var mailOptions = {
        from: '"Salud Primero S.A" <saludprimerooperario2016@gmail.com>', // sender address
        to: mail, // list of receivers
        subject: 'Creacion de Cuenta', // Subject line
        text: 'Se ha creado exitosamente su cuenta en el sistema de Salud Primero S.A' +
        'Su Contraseña temporal sera :'+ pass+'' +
        'Por favor acceder al sistema y cambiar su contraseña', // plaintext body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            // poner que paso un error
            return console.log("NO ENVIO VV");
        }
        //poner que fue exitoso
        console.log('Message sent: ' + info.response);
    });
*/

    console.log("Creado Satisfactoriamente");
    res.redirect("/operario/pacientes");
});

router.get('/ingreso-muestras/centroslist', function(req,res,next){
    Centro.find(function(err, centros){
        res.send(centros);
    });  
});

router.get('/muestras/editar/centroslist', function(req,res,next){
    Centro.find(function(err, centros){
        res.send(centros);
    });  
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