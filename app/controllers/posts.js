var mongoose = require('mongoose');
var express = require('express');

// express router // used to define routes 
var postRouter  = express.Router();
var userModel = mongoose.model('User')
var responseGenerator = require('./../../libs/responseGenerator');
var auth = require("./../../middlewares/auth");


module.exports.controller = function(app) {


    postRouter.get('/posts',function(req,res){
            
        res.render('posts');

    });//end get posts

    

     postRouter.get('/postLikes',auth.checkLogin,function(req,res){
        
            res.render('postLikes',{posts:req.session.user.userName && req.session.user.fullName });
	 });//end get likes 
	 
	postRouter.get('/postComment',auth.checkLogin,function(req,res){
        
            res.render('postComment',{posts:req.session.user.userName && req.session.user.fullName });
       
       

    });//end get comments 

    postRouter.get('/all/userName',function(req,res){
        
           postModel.find({},function(err,allposts){
            if(err){                
                res.send(err);
            }
            else{

                res.send(allposts);

            }

        }); 
   
    })

    postRouter.get('/all',function(req,res){
	
        postModel.find({},function(err,allposts){
            if(err){                
                res.send(err);
            }
            else{

                res.send(allposts);

            }

        });//end user model find 

    });//end get all posts

    postRouter.get('/:postId/info',function(req,res){

        postModel.findOne({'postId':req.param.postId},function(err,foundpost){
            if(err){
                var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                res.send(myResponse);
            }
            else if(foundpost==null || foundpost.postId==undefined){

                var myResponse = responseGenerator.generate(true,"user not found",404,null);
                //res.send(myResponse);
                res.render('error', {
                  message: myResponse.message,
                  error: myResponse.data
                });

            }
            else{

                  res.render('dashboard', { user:foundUser  });

            }

        });// end find
      

    });//end get all posts

    postRouter.post('/postLike',function(req,res){
		
			var today=Date.now();
			
			   var newpost = new postModel({
                userName            : req.body.firstName+''+req.body.lastName,
                firstName           : req.body.user.firstName,
                lastName            : req.body.lastName,
				
			   });		
			  
      
		  
         
            newpost.save(function(err){
                if(err){

                    var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                   //res.send(myResponse);
                   res.render('error', {
                     message: myResponse.message,
                     error: myResponse.data
                   });

                }
                else{

                    
                   req.session.user = foundUser;
                   delete req.session.user.password;
                   res.redirect('/dashboard')
                }

            });//end new user save


	    

             res.render('error', {
                     message: myResponse.message,
                     error: myResponse.data
              });

        
    });//end get all posts

        
		 
		 
		 
    postRouter.post('/postComment',function(req,res){
		
		    var today=Date.now();
		
			  var newComment = new commentModel({
                userName            : req.body.firstName+''+req.body.lastName,
                firstName           : req.body.firstName,
                lastName            : req.body.lastName,
			   
			  });
     
   

            newComment.save(function(err){
                if(err){

                    var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                   //res.send(myResponse);
                   res.render('error', {
                     message: myResponse.message,
                     error: myResponse.data
                   });

                }
                else{

                    
                   req.session.user = foundUser;
                   delete req.session.user.password;
                   res.redirect('/dashboard');
                }

            });//end new user save

             res.render('error', {
                     message: myResponse.message,
                     error: myResponse.data
              });

        
        

    });//end get all posts

exports.setLoggedInUser = function(req,res,next){

	if(req.session && req.session.user){
		postModel.findOne({'posts':req.session.user.posts},function(err,user){

			if(user){
				req.user = user;
				delete req.user.password; 
				req.session.user = user;
				next()
			}
			else{
				// do nothing , because this is just to set the values
			}
		});
	}
	else{
		next();
	}


}//


    // this should be the last line
    // now making it global to app using a middleware
    // think of this as naming your api 
	
    app.use('/posts', postRouter);




 
} //end contoller code
