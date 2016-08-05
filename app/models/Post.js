
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({

	userName 			: {type:String,default:'',required:true,unique:true},
	fullName			: {type:String},
	postText 			: {type:String},
	created				: {type:Date,default:Date.now()},
	modified			: {type:Date,default:Date.now()},
	comments			: [], // because there are multiple comments 
	totalComments		: {type:Number,default:0},
	totalLikes			: {type:Number,default:0},
	likedBy             : [],
	hashTags 			: []
	
});




mongoose.model('Post',postSchema);
