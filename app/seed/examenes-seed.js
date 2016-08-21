var Examen = require('../models/modExamen.js');

var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:oscarpol@ds161295.mlab.com:61295/practicanode');
require('../config/passport');


var  examenes = [
    new Examen ({
		fechaMuestra: 08/08/2016, 
		tipoMuestra: "Sangre",
		estado: "Listo"
    }),
    new Examen ({
		fechaMuestra: 08/08/2016, 
		tipoMuestra: "Heces",
		estado: "Pendiente"
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
