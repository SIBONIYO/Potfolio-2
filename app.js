//Imorting the package
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require ('dotenv/config');
const cors = require ('cors');
const postsRoute = require('./Routes/Posts');



//middlewares
app.use(express.json());
app.use(postsRoute);



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
