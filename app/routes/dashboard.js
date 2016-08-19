var express = require('express');
var router = express.Router();
//este script es solo de prueba, para ver los views
router.get('/', function(req, res, next) {
  res.render('dash_layout', { title: 'Bienvenido' });
});

router.get('/logout', function(req, res, next) {
  res.render('logout', { title: 'Logout' });
});

//vistas usuarios
router.get('/usuario', function(req, res, next) {
  res.render('usuario/dash_user', { title: 'Bienvenido' });
});

/*router.get('/usuario/centros-medicos', function(req, res, next) {
  res.render('usuario/centros_medicos', { title: 'Mis Examenes' });
});*/
router.get('/usuario/centros-medicos', function(req, res) {
  res.render('usuario/centros_medicos', { title: 'Centros Medicos' });
    });
});

router.get('/usuario/examenes', function(req, res, next) {
  res.render('usuario/examenes_user', { title: 'Mis Examenes' });
});

router.get('/usuario/perfil', function(req, res, next) {
    var db = req.db;
    var collection = db.get('datosUser');
    collection.find({},{},function(e,docs){
        res.render('usuario/perfil_user',{
            title: 'Mi Perfil',
            "usuarioInfoList" : docs
        });
    });
  //res.render('usuario/perfil_user', { title: 'Mi Perfil' });***
});

// vistas operarios
router.get('/operario', function(req, res, next) {
  res.render('operario/dash_operario', { title: 'Bienvenido' });
});

router.get('/operario/pacientes', function(req, res, next) {
  res.render('operario/admin_pacientes', { title: 'Administrar Pacientes' });
});

router.get('/operario/ingreso-muestras', function(req, res, next) {
  res.render('operario/ingreso_muestra', { title: 'Ingreso de Muestras' });
});

router.get('/operario/muestras', function(req, res, next) {
  res.render('operario/admin_muestra', { title: 'Administrar Muestras' });
});

router.get('/operario/muestras/editar', function(req, res, next) {
  res.render('operario/editar_muestra', { title: 'Editar Muestra' });
});

router.get('/operario/reportes', function(req, res, next) {
  res.render('operario/generar_reportes', { title: 'Generacion de Reportes' });
});
//vistas laboratorista
router.get('/laboratorista', function(req, res, next) {
  res.render('laboratorista/dash_lab', { title: 'Bienvenido' });
});

router.get('/laboratorista/recepcion-muestras', function(req, res, next) {
  res.render('laboratorista/recepcion_muestra', { title: 'Recepcion de Muestras' });
});

router.get('/laboratorista/ingreso-resultados', function(req, res, next) {
  res.render('laboratorista/ingreso_resultados', { title: 'Ingreso de Resultados de Muestras' });
});

module.exports = router;