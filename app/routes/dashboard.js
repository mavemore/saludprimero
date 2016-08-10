var express = require('express');
var router = express.Router();
//este script es solo de prueba, para ver los views
router.get('/', function(req, res, next) {
  res.render('dash_layout', { title: 'Bienvenido' });
});

router.get('/usuario', function(req, res, next) {
  res.render('usuario/dash_user', { title: 'Bienvenido' });
});

router.get('/operario', function(req, res, next) {
  res.render('operario/dash_operario', { title: 'Bienvenido' });
});

router.get('/laboratorista', function(req, res, next) {
  res.render('laboratorista/dash_lab', { title: 'Bienvenido' });
});

module.exports = router;