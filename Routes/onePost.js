require ('dotenv').config()
const postModel = require("../models/postModel");
const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
   const post =  postModel.findById(req.params.postId)
   if(!post) {
       return res.status(404).json({error: 'post not found by id'})
   }
   next() 
}