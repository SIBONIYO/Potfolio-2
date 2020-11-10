//Importing the package
const express = require('express');
const app = express();
const expressValidator = require('express-validator')
const mongoose = require('mongoose');
require ('dotenv/config');
const cors = require ('cors');
const postsRoute = require('./Routes/Posts');
const signin = require('./Routes/signin');
const queries = require('./Routes/Queries');



const swaggerJsDoc = require('swagger-jsdoc');
//const swaggerOptions = require('swaggerJsDoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const validatorOptions = {};
//app.use(expressValidator(validatorOptions));

require('./seeds/user')
//middlewares
app.use(express.json());
app.use('/api/posts',postsRoute);
app.use('/api/Queries', queries);
app.use('/api/signin', signin);
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/*', (req,res) =>{ 
    return res.status(502).json({message:'Bad Gateway'});
});

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    {useNewUrlParser: true,
     useUnifiedTopology:true},
    ()=> console.log('connected to DB!')
);

//listen for request or how do we listen to the server
app.listen(process.env.PORT || 3000, () => {
        console.log("App started....")
});
module.exports = app;