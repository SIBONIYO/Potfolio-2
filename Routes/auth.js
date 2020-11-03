const router = require('express').Router();
const user = require('../models/user');
const bcrypt = require( 'bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation , signinValidation} = require('./validation');




router.post(' /register', async (req,res)=>{
    //Lets validate the data before a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details(0).message);

    //checking if the user already exist in the database
    const emailExist = await user.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist!');


    //Hash Password
    const salt = await bcrypt.gentsalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create a anew User
    const user = new user({
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//SIGNIN
router.post('/signin', async (req,res) =>{
    
    //Lets validate the data before a user
    const {error} = signinValidation(req.body);
    if(error) return res.status(400).send(error.details(0).message);

    //checking if the email already exist in the database
    const user = await user.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email not found!');

    // checking if the Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password')

    //  Create and assign a token
    const token = jwt.sign({_id:user.id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

})

module.exports = router;