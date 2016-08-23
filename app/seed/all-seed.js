var User = require('../models/user_login');
var Paciente = require('../models/paciente');
var Muestra = require('../models/muestra');
var Examen = require('../models/examen');

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:oscarpol@ds161295.mlab.com:61295/practicanode');
require('../config/passport');

var examen1 = new Examen ({
    nombre: "Hemograma",
    estado: "Listo",
    codigo: "12345678",
    resultado: [{
        parametro: "hematocrito",
        unidades: "25",
        medidas: "44.9",
        referencia: "35.2 - 52.8"
    },{
        parametro: "Linfocitos",
        unidades: "24",
        medidas: "22",
        referencia: "9 - 26"
    }
    ]
});

examen1.save(
    console.log("hola")
);

var examen2 = new Examen({
    nombre: "examen de Orina",
    estado: "Pendiente",
    codigo: "12345678",
    resultado: [{
        parametro: "cosas de orina 1",
        unidades: "25",
        medidas: "44.9",
        referencia: "35.2 - 52.8"
    },{
        parametro: "cosas de orina 2",
        unidades: "24",
        medidas: "22",
        referencia: "9 - 26"
    }
    ]
});

examen2.save();

var muestra1 = new Muestra ({
    tipo: "sangre",
    fecha: Date.now
});

muestra1.examenes.push(examen1);
muestra1.save();

var muestra2 = new Muestra ({
    tipo: "Orina",
    fecha: Date.now
});

muestra2.examenes.push(examen2);
muestra2.save();


var user1 = new User ({
    email: 'oscarmoreno_ds@hotmail.com',
    password: '1234',
    rol: 'cliente'
});
user1.password = user1.encryptPassword(user1.password);



var user2 = new User ({
    email: 'veronica@hotmail.com',
    password: '1234',
    rol: 'operario'
});
user2.password = user2.encryptPassword(user2.password);
//user2.save();

var user3 = new User ({
    email: 'edgar@hotmail.com',
    password: '1234',
    rol: 'laboratorista'
});
user3.password = user3.encryptPassword(user3.password);
//user3.save();
var user4 = new User ({
    email: 'carlos@hotmail.com',
    password: '1234',
    rol: 'cliente'
});
user4.password = user4.encryptPassword(user4.password);
//user4.save();


var paciente1 = new Paciente ({
    user: user1._id,
    nombres: "oscar",
    apellidos: "moreno",
    direccion: "av. brasil",
    cedula: "0931245226",
    telefonos: ["123489", "1312312"],
    foto: "foto"
});
paciente1.muestras.push(muestra1);
paciente1.muestras.push(muestra2);

var paciente2 = new Paciente ({
    user: user4._id,
    nombres: "Carlos",
    apellidos: "Manosalvals",
    direccion: "av. debo hacer más u.u",
    cedula: "093222323",
    telefonos: ["123489", "1312312"],
    foto: "foto"
});

paciente2.muestras.push(muestra1);
paciente2.muestras.push(muestra2);

paciente1.save();
paciente2.save();

user1.paciente = paciente1._id;
user4.paciente = paciente2._id;
user1.save();
user2.save();
user3.save();
user4.save();

//mongoose.disconnect();