const express = require("express");
const postComment = require("../models/postComment");
const router = require('express').Router();
const postModel = require("../models/postModel");
const verify = require('./verifyToken');
const onePost = require('./onePost');


const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { deleteOne } = require("../models/postComment");

// SWAGGER https://swagger.io/specification/
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Post API',
      description: 'Post API Information',
      contact: {
        name: 'Sibo my brand'
      },
      servers: ('http://localhost:3000')
    }
  },
  // ['.route/*.js']
  apis: ('app.js')
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//SWAGGER ROUTES
/** 
 * @swagger
 * /posts:
 * GET:
 *    description: use to request all Posts
 *    responses:
 *      '200':
 *          description: A successful response
*/
app.get('/posts',(req,res) =>{
  res.status(200).send('Posts Results');
});

/** 
 * @swagger
 * /post:
 * GET A POST BY ID:
 *    description: use to get a Post by Id
 *    responses:
 *      '200':
 *          description: A successful response
*/
app.get('/posts/:postId',(req,res) =>{
  res.status(200).send('Post Result');
});

/** 
 * @swagger
 * /post:
 * PUT:
 *    description: use to update a Post
 *    responses:
 *      '201':
 *          description: A successful response
*/
app.put('/posts/:postId',(req,res) =>{
  res.status(200).send('successfully updated post');
});

/** 
 * @swagger
 * /post:
 * POST:
 *    description: use to post a new Post
 *    responses:
 *      '200':
 *          description: A successful response
*/
app.post('/posts',(req,res) =>{
  res.status(200).send('successfully Posted');
});

/** 
 * @swagger
 * /post:
 * DELETE:
 *    description: use to delete a Post
 *    responses:
 *      '200':
 *          description: A successful response
*/
app.delete('/posts/:postId',(req,res) =>{
  res.status(200).send('successfully deleted');
});





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
