var express = require('express');
var router = express.Router();
var passport = require('passport');
var Centro = require('../models/modCentro');
var Examen = require('../models/modExamen.js');
var UserInfo = require('../models/modUsuario.js');
var usuarioLog = require('../models/user_login');


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
    UserInfo.find({email:req.session['email']},{},function(e,userinf){//aqui se debe hacer el query para seleccionar solo la info del usuario que esta en sesion
        res.render('usuario/perfil_user',{
            title: 'Mi Perfil',
            usuarioInfoList : userinf
        });
    });
});

router.post('/perfil/editUser', function(req, res, next){
    UserInfo.update({email:req.session['email']}, {
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      cedula: req.body.cedula,
      email: req.body.email,
      dir: req.body.direccion,
      telf: req.body.telefono
    },
    function(err){
      res.redirect('/usuario/perfil');
    });
});

router.post('/perfil/newPass', function(req, res, next){
    //res.send(req.body.newpassword1);
    if (req.body.newpassword1 === req.body.newpassword2){//chequeo que la nueva contrasena y su validacion sean iguales
      usuarioCompare1 = new usuarioLog({password:'0'});
      usuarioPrueba = new usuarioLog({password:req.body.password});
      usuarioPrueba.password = usuarioPrueba.encryptPassword(usuarioPrueba.password);
      //var pass = usuarioLog.findOne({email:req.session['email']}, {password: true});
      //console.log(pass.text());
      usuarioLog.findOne({email:req.session['email']}, function(err,user){
        //console.log(user.password);
        /*usuarioCompare1.password = user.password;
        usuarioCompare1.password = usuarioCompare1.validPassword(usuarioCompare1.password);
        console.log(usuarioCompare1.password);*/
        if(err){res.send('contrasena incorrecta')}
        if(user.validPassword(user.password)){
          user.password = user.encryptPassword(newpassword1);
          console.log(user.password);//no entra aqui
        }
      });console.log("hola");
      //if(){}
      res.send(usuarioPrueba);
    /*UserInfo.update({email:req.session['email']},{
      password: req.body.newpassword1//falta validar que la contrasena es la correcta y que confirmacion de nueva pass
    },
    function(err){
      res.redirect('/usuario/perfil');
    });*/
    //res.send('ok');
    return;
    }res.send('error');
    
});

router.get('/examenes', isLoggedIn, function(req, res, next) {
    //res.render('usuario/examenes_user', { title: 'Mis Examenes' });//cargar examenes de la bbdd
    Examen.find(function(err, list){
        res.render('usuario/examenes_user', {
            title: 'SaludPrimero | Mis Exámenes',
            examenes: list
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