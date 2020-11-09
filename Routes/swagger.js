const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// SWAGGER https://swagger.io/specification/
const options = {
    openapi = '3.0.0',
  definition: {
    info: {
      title: 'Post API',
      description: 'Post API Information',
      contact: {
        name: 'Sibo my brand'
      },
      //server: ('http://localhost:3000')
    },
  },
    // ['.route/*.js']
  apis: ('./Routes/swagger.js')
  

};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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


module.export= router;