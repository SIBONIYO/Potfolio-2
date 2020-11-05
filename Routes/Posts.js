const express = require("express");
const postComment = require("../models/postComment");
const router = require('express').Router();
const postModel = require("../models/postModel");
const verify = require('./verifyToken');
const onePost = require('./onePost');


const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { deleteOne } = require("../models/postComment");

// SWAGGER
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Customer API',
      description: 'Customer API Information',
      contact: {
        name: 'Sibo my brand'
      },
    }
  }
};

//SUBMIT A POST
router.post("/", verify, async (req, res) => {
  const post = new postModel({
    title: req.body.title,
    description: req.body.description,
  });
    const savedPost = await post.save();
    return res.status(201).json(savedPost);
});

//GET BACK ALL THE POST
router.get("/",  async (req, res) => {
    const posts = await postModel.find();
    return res.status(200).json({ message: 'successful' , posts});
  
});

//GET BACK A POST BY ID
router.get('/:postId', onePost, async (req, res) => { 
    const post = await postModel.findById(req.params.postId); 
      return res.status(200).json({ message: "post is successfull", post });
});

// Post and comments

router.post('/:postId/comments', onePost, async (req,res) =>{
  const comment = new postComment({ 
      name: req.body.name,
      commentbody:req.body.commentbody,
      postId: req.params.postId,
  });
  try{
      const savedComment = await comment.save();
      return res.status(201).json({savedComment});
  }catch (err) {
      return res.status(500).json({message:'An error found while trying to save your comment!'});
  };
});

//DELETE A POST
router.delete("/:postId", verify, onePost, async (req, res) => {
    const removedPost = await postModel.deleteOne({ _id: req.params.postId });
    return res.status(201).json({ message: "Post was deleted!" });
});

// UPDATE A POST

router.patch("/:postId", verify, onePost, async (req, res) => {
  const post = await postModel.findById(req.params.postId);
  post.title = req.body.title || post.title;
  post.description = req.body.description || post.description;

    const savedPost = await post.save();
    return res.status(201).json(savedPost);
});

module.exports = router;
