var mongoose = require('mongoose');  
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config');
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
mongoose.model('User', UserSchema);
mongoose.connect('mongodb://meetzaveri:mlab7771@ds247699.mlab.com:47699/auth-db-node');

function registerUser(reqName,reqEmail,reqPswd){
	var hashedPassword = bcrypt.hashSync(reqPswd, 8);
	 User.create({
	    name : reqName,
	    email : reqEmail,
	    password : hashedPassword
	},function (err, user) {
	    if (err) console.log('Err 500')
	    // create a token
	    var token = jwt.sign({ id: user._id }, config.secret, {
	      expiresIn: 86400 // expires in 24 hours
	    });
	    localStorage.setItem('token',token);
	}); 
	
}