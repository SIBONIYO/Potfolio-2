const express = require("express");
const postComment = require("../models/postComment");
const router = require('express').Router();
const postModel = require("../models/postModel");
const verify = require('./verifyToken');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// SWAGGER
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Customer API',
      description: 'Customer API Information',
      contact: {
        name: 'Sibo my brand'
      },
      //servers: {'https://localhost:3000' }
    },
  },
  //Finding APIs
  //apis: {'../app.js', }
};


//GET BACK ALL THE POST
router.get("/",  async (req, res) => {
  console.log("posts");
  try {
    const posts = await postModel.find();
    return res.status(200).json({ message: posts });
  } catch (err) {
    console.log(err);
    return res.json({ message: "err" });
  }
});

//GET BACK A POST BY ID
router.get('/:postId', async (req, res) => { 
  try {
    const post = await postModel.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }
    const comments = await postComment.find({postId: req.params.postId})
    return res.status(200).json({ message: "post is successfull", post, comments });
  } catch (err) {
    console.log(err);
    return res.json({ message: "err" });
  }
});
//SUBMIT A POST
router.post("/", verify, async (req, res) => {
  const post = new postModel({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    return res.status(201).json(savedPost);
  } catch (err) {
    return res.status(500).json({ message: 'post not submitted!' });
  }
});

// Post and comments

router.post('/:postId/comments', async (req,res) =>{
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

//DELETE A POST
router.delete("/:postId", verify, async (req, res) => {
  const post = await postModel.findById(req.params.postId);
  if (!post) {
    return res.status(404).json({ error: "post not found" });
  }
  try {
    const removedPost = await postModel.deleteOne({ _id: req.params.postId });
    return res.status(201).json({ message: "Post was deleted!" });
  } catch (err) {
    return res.status(500).json({ message: "please review the post id" });
  }
});

// UPDATE A POST

router.patch("/:postId", verify, async (req, res) => {
  const post = await postModel.findById(req.params.postId);
  if (!post) {
    return res.status(404).json({ error: "post not found" });
  }
  post.title = req.body.title || post.title;
  post.description = req.body.description || post.description;

  try {
    const savedPost = await post.save();
    return res.status(201).json(savedPost);
  } catch (err) {
    return res.status(500).json({ message: "Updated post not found" });
  }
});

module.exports = router;
