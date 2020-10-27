const express = require ('express');
const { findById } = require('../models/postModel');
const { route } = require('./Posts');
const router = express.Router();
const postModel = require('../models/postModel');


//Post a Comment
router.post('/posts/:postId', async (req,res) =>{
    
    const comment = await postModel.findById(req.params.postId)
    ({ 
        name: req.body.name,
        commentbody:req.body.commentbody,
    })
    try{
        const savedComment = await comment.save();
        return res.status(201).json({savedComment});
    }catch (err) {
        console.log(err);
        return res.status(500).json({message:'An error found while trying to save your comment!'});
    };
});
module.exports = router;
