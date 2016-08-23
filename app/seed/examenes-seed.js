var Examen = require('../models/modExamen.js');

var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:oscarpol@ds161295.mlab.com:61295/practicanode');
require('../config/passport');


var  examenes = [
    new Examen ({
		fechaMuestra: Date.now, 
		tipoMuestra: "Orina",
		estado: "En Espera"
    }),
    new Examen ({
		fechaMuestra: Date.now, 
		tipoMuestra: "Heces",
		estado: "Pendiente"
    }),
    new Examen ({
        fechaMuestra: Date.now, 
        tipoMuestra: "Sangre",
        estado: "En Espera"
    })
];

var done = 0;
for (var i=0; i< examenes.length; i++){
    examenes[i].save(function(err,result){
        done++;
        if(done === examenes.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}
