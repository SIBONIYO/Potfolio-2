const express = require("express");
const router = express.Router();
const postModel = require("../models/postModel");

//GET BACK ALL THE POST
router.get("/posts", async (req, res) => {
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
router.get("/posts/:postId", async (req, res) => {
  try {
    const posts = await postModel.findById(req.params.postId);
    return res.status(200).json({ message: posts });
  } catch (err) {
    console.log(err);
    return res.json({ message: "err" });
  }
});
//SUBMIT A POST
router.post("/posts", async (req, res) => {
  const post = new postModel({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    return res.status(201).json({ savedPost });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

//DELETE A POST
router.delete("/posts/:postId", async (req, res) => {
  try {
    const removedPost = await postModel.deleteOne({ _id: req.params.postId });
    return res.status(201).json({ removedPost });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

// UPDATE A POST

router.patch("/posts/:postId", async (req, res) => {
  const post = await postModel.findById(req.params.postId);
  if (!post) {
    return res.status(404).json({ error: "post not found" });
  }
  post.title = req.body.title;
  post.description = req.body.description;

  try {
    const savedPost = await post.save();
    return res.status(201).json({ savedPost });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
