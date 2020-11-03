const express = require("express");
const router = require('express').Router();
const User = require("../models/user");
require ('dotenv').config()
const jwt = require('jsonwebtoken')

//Signin
router.post("/", async (req, res) => {
  const user = await User.findOne({email: req.body.email})
  
  if(!user){
    return res.status(400).json({message: 'user not found'});
  }

  if(user.password !== req.body.password) {
    return res.status(400).json({message: 'wrong password'});
  }

  const token = await jwt.sign(user.email, process.env.TOKEN_SECRET);
    return res.status(200).json({message: 'success', token});

});

module.exports = router;
