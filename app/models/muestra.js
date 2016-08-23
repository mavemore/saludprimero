var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    tipo: {type: String, required: true},
    fecha: {type: String, required: true},
    examenes: [{type: Schema.Types.ObjectId, ref: 'examendb'}]

});

module.exports = mongoose.model("muestradb", schema);



