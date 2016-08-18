var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	email: {type: String, required: true}, 
	password: {type: String, required: true}, 
	rol: String
});


userSchema.methods.encryptPassword = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("userLogin", userSchema);