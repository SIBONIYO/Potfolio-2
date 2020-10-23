const express = require ('express');
const { findById } = require('../models/postModel');
const { route } = require('./Posts');
const router = express.Router();
const postModel = require('../models/postModel');
const postcomment = require('../models/postModel');



//Get a Comment
router.post('/posts/:postId', async(req,res) =>{
    
    const comment = await postModel.findById(req.params.postId)
    ({
        name: req.body.name,
        comment:req.body.comment,
    })
    try{
        const savedComment = await comment.save();
        return res.status(201).json({message:'savedComment'});
    }catch (err) {
        console.log(err);
        return res.status(500).json({message:'err'});
    };
});
module.exports = router;
