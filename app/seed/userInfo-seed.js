var User = require('../models/modUsuario');

var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:oscarpol@ds161295.mlab.com:61295/practicanode');


var  userInfo = [
    new User ({
		nombre: "Edgar Daniel", 
		apellidos: "Moreira Apolo", 
		cedula: "1721989356",
		email: "edgar@hotmail.com",
		dir: "calle a",
		telf: "0993100552",
		img: ""
    })
];

var done = 0;
for (var i=0; i< userInfo.length; i++){
   userInfo[i].save(function(err,result){
        done++;
        if(done === userInfo.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}
