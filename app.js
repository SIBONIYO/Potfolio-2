//Imorting the package
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require ('dotenv/config');
const cors = require ('cors');
const postsRoute = require('./Routes/Posts');
const commentsRoute = require('./Routes/comments');
const signin = require('./Routes/signin');
const postComment = require('./models/postComment');

require('./seeds/user')

//middlewares
app.use(express.json());
app.use('/api/posts',postsRoute);
app.use('/api/comments', postComment);
app.use('/api/signin', signin);

app.use('/*', (req,res) =>{
    
    return res.status(404).json({message:'route not found'});
});

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    {useNewUrlParser: true}, 
    ()=> console.log('connected to DB!')
);

//listen for request or how do we listen to the server
app.listen(process.env.PORT || 3000, () => {
    console.log("App started....")
});
