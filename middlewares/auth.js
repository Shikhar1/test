//to check db entry
var mongoose = require('mongoose');
var userModel = mongoose.model('User');





exports.checkLogin = function(req,res,next){

	if( !req.session.user){
		//if the user doesn't exist redirect him to login screen"
		res.redirect('/users/login/screen');//redirect to route
	}
	else{
      //if it exists  then move forward
		next();
	}

}// end checkLogin