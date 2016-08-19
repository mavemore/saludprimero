var Centro = require('../models/modCentro');

var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:oscarpol@ds161295.mlab.com:61295/practicanode');
require('../config/passport');


var  centros = [
    new Centro ({
		nombre: "SaludPrimero Centro", 
		horarios: "8:00 a 20:00", 
		direccion: "Av. 9 de Octubre",
		descripcion: "Centro medico localizado en el centro de la ciudad.",
		latitud: "-30",
		longitud: "-79",
		imagenesURL: ""
    }),
    new Centro ({
		nombre: "SaludPrimero Urdesa", 
		horarios: "7:30 a 21:00", 
		direccion: "direccion 2",
		descripcion: "Centro medico localizado en Urdesa.",
		latitud: "-30",
		longitud: "-79",
		imagenesURL: ""
    })
];

var done = 0;
for (var i=0; i< centros.length; i++){
    centros[i].save(function(err,result){
        done++;
        if(done === centros.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}
