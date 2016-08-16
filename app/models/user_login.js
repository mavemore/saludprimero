var mongoose = require('mongoose');

var userLoginSchema = new mongoose.Schema({
	email: {type: String, required: true}, 
	password: {type: String, required: true}, 
	rol: String
}, {collection: 'user-data'} );

module.exports = mongoose.model("userLogin", userLoginSchema);