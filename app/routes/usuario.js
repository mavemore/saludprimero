var express = require('express');
var router = express.Router();
var passport = require('passport');
var Centro = require('../models/modCentro');
var Examen = require('../models/modExamen.js');
var UserInfo = require('../models/modUsuario.js');
var usuarioLog = require('../models/user_login');
var Muestra = require('../models/muestra');
var Examen = require('../models/examen');

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
    usuarioLog.findOne({ email : req.session['email']})
        .populate('paciente')
        .exec(function (err, user) {
            if (err) return handleError(err);
            /*console.log(user.paciente);
            console.log(user.paciente.nombres);*/
            res.render('usuario/perfil_user',{
                title: 'Mi Perfil',
                paciente : user.paciente,
                usuario : user
            });
        });

    /*UserInfo.find({email:req.session['email']},{},function(e,userinf){//aqui se debe hacer el query para seleccionar solo la info del usuario que esta en sesion

        res.render('usuario/perfil_user',{
            title: 'Mi Perfil',
            usuarioInfoList : userinf
        });
    });*/
});

router.post('/perfil/editUser', function(req, res, next) {
        usuarioLog.findOne({ email : req.session['email']})
            .populate('paciente')
            .exec(function (err, user) {
                if (err) return handleError(err);
                user.paciente.nombres =req.body.nombres;
                user.paciente.apellidos =req.body.apellidos;
                user.paciente.cedula =req.body.cedula;
                user.email = req.body.email;
                user.paciente.direccion =req.body.direccion;
                user.paciente.telefonos =req.body.telefono;
                user.paciente.save();
                user.save();
                res.redirect('/usuario/perfil');
            })
        //res.redirect('/usuario/perfil');
}, function (err) {
        res.redirect('/usuario/perfil');
    }
    /*UserInfo.update({email:req.session['email']}, {
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      cedula: req.body.cedula,
      email: req.body.email,
      dir: req.body.direccion,
      telf: req.body.telefono
    },
    function(err){
      res.redirect('/usuario/perfil');
    });*/
);

router.post('/perfil/newPass', function(req, res, next){
    //res.send(req.body.newpassword1);
    if (req.body.newpassword1 === req.body.newpassword2){//chequeo que la nueva contrasena y su validacion sean iguales
      //usuarioCompare1 = new usuarioLog({password:'0'});
      usuarioPrueba = new usuarioLog({password:req.body.newpassword1});
      usuarioPrueba.password = usuarioPrueba.encryptPassword(usuarioPrueba.password);
      //var pass = usuarioLog.findOne({email:req.session['email']}, {password: true});
      //console.log(pass.text());
      //usuarioLog.findOne({email:req.session['email']}, function(err,user){
        //console.log(user.password);
        /*usuarioCompare1.password = user.password;
        usuarioCompare1.password = usuarioCompare1.validPassword(usuarioCompare1.password);
        console.log(usuarioCompare1.password);*/
        /*if(err){
          res.send('contrasena incorrecta');
          return;
        }else{*/
        //user.password = usuarioPrueba.password;
        //console.log(usuarioPrueba.password);//no entra aqui
        //}
      //});
      usuarioLog.findOne({email:req.session['email']}).exec(function (err, user){
        if (err) return handleError(err);
        user.password = usuarioPrueba.password;
        user.save();
        console.log(user.password);
        console.log(usuarioPrueba.password);
      })
      //if(){}
      //res.send(usuarioPrueba);
    /*UserInfo.update({email:req.session['email']},{
      password: req.body.newpassword1//falta validar que la contrasena es la correcta y que confirmacion de nueva pass
    },
    function(err){
      res.redirect('/usuario/perfil');
    });*/
    res.redirect('/usuario/perfil');
    return;
    }res.send('Las contrasenas ingresadas no son iguales');
    
});

router.get('/examenes', isLoggedIn, function(req, res, next) {

    usuarioLog.findOne({ email : req.session['email']})
        .populate({path: 'paciente', populate: {path: 'muestras'}})
        .exec( function (err, user) {
            console.log("------");
            console.log(user.paciente.muestras);
            console.log("------");
            console.log(user.paciente.muestras[0]);
            console.log("------");
            console.log(user.paciente.muestras[0].examenes);
            res.render('usuario/examenes_user' , {title: 'Mis Examenes',
                examenes: user.paciente.muestras
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