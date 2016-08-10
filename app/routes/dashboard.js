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

router.get('/usuario/centros-medicos', function(req, res, next) {

  res.render('usuario/centros_medicos', { title: 'Centros Medicos' });
});

router.get('/usuario/examenes', function(req, res, next) {
  res.render('usuario/examenes_user', { title: 'Mis Examenes' });
});

router.get('/usuario/perfil', function(req, res, next) {
  res.render('usuario/perfil_user', { title: 'Mi Perfil' });
});

// vistas operarios
router.get('/operario', function(req, res, next) {
  res.render('operario/dash_operario', { title: 'Bienvenido' });
});

router.get('/operario/ingreso-muestras', function(req, res, next) {
  res.render('operario/ingreso_muestra', { title: 'Ingreso de Muestras' });
});

router.get('/operario/modificar-muestras', function(req, res, next) {
  res.render('operario/modificar_muestra', { title: 'Modificacion de Muestras' });
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