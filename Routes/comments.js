const express = require ('express');
const { findById } = require('../models/postModel');
const { route } = require('./Posts');
const router = express.Router();
const postComment = require('../models/postComment');


//Post a Comment
router.post('/', async (req,res) =>{
    console.log(req.params.postId);
    const comment = new postComment({ 
        name: req.body.name,
        commentbody:req.body.commentbody,
        postId: req.params.postId,
    });
    try{
        const savedComment = await comment.save();
        return res.status(201).json({savedComment});
    }catch (err) {
        console.log(err);
        return res.status(500).json({message:'An error found while trying to save your comment!'});
    };
});



module.exports = router;
