var express = require('express');
var router = express.Router();
var passport = require('passport');
var nodemailer= require('nodemailer');

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


router.get('/pacientes/crearNuevo', function(req, res, next){
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
    var mailOptions = {
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


    console.log("Creado Satisfactoriamente");
    res.redirect("/operario/pacientes");
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