var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user_login');
var Paciente = require('../models/paciente');

var nodemailer= require('nodemailer');
var Centro= require('../models/modCentro');
var Muestra=require('../models/muestra');

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
    Paciente.find().exec(function(err, paciente){
        res.render('operario/admin_pacientes', { title: 'Administrar Pacientes',
            pacientes: paciente});
    })

});

router.get('/pacientes/prueba', function(req, res, next){
    Paciente.find().exec(function ( err, paciente){
        console.log(paciente);
        res.send(paciente);
    });
})

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
router.post('/ingreso-muestras/nuevoPaciente',  function (req, res, done) {
        console.log("POST:" + req.param('email'));
        var email = req.param('email');
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
            var pass = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 8; i++ ) {
                pass += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            newUser.password= newUser.encryptPassword(pass);
            newUser.rol = "cliente";
            newUser.save(function (err, result) {
                if(err){
                    return done(err);
                }
                //return done(null, newUser);
                console.log("Estamos en pacientes");
                var paciente = new Paciente();
                paciente.user = newUser._id;
                paciente.nombres = req.param('nombre');
                paciente.apellidos = req.param('apellido');
                paciente.cedula = req.param('cedula');
                
                paciente.save(function (err) {
                    if (err) return handleError(err);
                    console.log("funciona!");
                });

            });
            var mailOptions = {
                from: '"Salud Primero S.A" <saludprimerooperario2016@gmail.com>', // sender address
                to: email, // list of receivers
                subject: 'Creacion de Cuenta', // Subject line
                text: 'Se ha creado exitosamente su cuenta en el sistema de Salud Primero S.A\n' +
                'Su Contraseña temporal sera :'+ pass+'' +
                '\nPor favor acceder al sistema y cambiar su contraseña', // plaintext body
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    // poner que paso un error
                    return console.log("NO ENVIO");

                }
                //poner que fue exitoso
                console.log('Message sent: ' + info.response);
            });
        });
        res.redirect('/operario/ingreso-muestras');

    }
);


router.get('/ingreso-muestras/centroslist', function(req,res,next){
    Centro.find(function(err, centros){
        res.send(centros);
    });  
});

router.put('/editar_muestra', function(req, res, next){

    res.render('operario/editar_muestra')
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