const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const server = require('../app.js');


// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Posts API', () =>{

    // Test the GET route
    describe('GET /api/posts', () =>{
        it('it should get all the posts', (done)=> {
            chai.request(server)
            .get('/api/posts')
            .end((err, response) =>{
                response.should.have.status(200);
                response.message.should.be.a('array');
            done();
            });
        })
        it('it should not get all the posts', (done)=>{
            chai.request(server)
            .get('/api/pot')
            .end((err, response) =>{
                response.should.have.status(404);
            done();
            });
        });
    })

    //Test the GET (by Id) route
    describe('GET /api/posts/:postId', () =>{
        it('it should get a post by Id', (done)=>{
            const postId =1;
            chai.request(server)
            .get('/api/posts/' + postId)
            .end((err,response) =>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('id');
                response.body.should.have.property('name');
                response.body.should.have.property('completed');
            done();
            });
        });
        it('it should not get a post by Id', (done)=>{
            const postId =123;
            chai.request(server)
            .get('/api/posts/' + postId)
            .end((err,response) =>{
                response.should.have.status(404);
                //response.text.should.have.property('post with a provided Id not found');
            done();
            });
        });
    });
    //Test the POST route
    describe('POST/api/posts', ()=>{
        it('it should post a new post', (done) =>{
            const post = {
                name: 'post 4',
                completed: false,
            };
            chai.request(server)
            .post('/api/posts')
            .send(post)
            .end((err,response) =>{
                response.should.have.status(201);
                response.body.should.have.a('object');
                response.body.should.have.property('id').eq(4);
                response.body.should.have.property('name').eq('post 4');
                response.body.should.property('completed').eq(false);
            done();
            });
        });
        it('it should not post', (done)=>{
            const post ={
                completed: false,
            };
            chai.request(server)
            .post('/api/posts')
            .send(post)
            .end((err,response) =>{
                response.should.have.status(404);
                //response.text.should.have.property('Post not submitted!');
            done();
            })
        })
    })
    //Test the PUT route
    describe('PUT/api/posts/:postId', ()=>{
        it('it should put an existing post', (done) =>{
            const postId = 1;
            const post = {
                name: 'post 1 changed',
                completed: true,
            };
            chai.request(server)
            .post('/api/posts' +postId)
            .send(post)
            .end((err,response) =>{
                response.should.have.status(200);
                response.body.should.have.a('object');
                response.body.should.have.property('id').eq(1);
                response.body.should.have.property('name').eq('post 1 changed');
                response.body.should.property('completed').eq(true);
            done();
            });
        });
        it('it should not put an existing post with a name less than 3 characters', (done) =>{
            const postId = 1;
            const post = {
                name: 'po',
                completed: true,
            };
            chai.request(server)
            .post('/api/posts' + postId)
            .send(post)
            .end((err,response) =>{
                response.should.have.status(404);
               // response.body.should.have.property('name must be longer than 2 characters!')
            done();
            });
        });
    });

    //Test the PATCH route
    describe('PATCH/api/posts/:postId', ()=>{
        it('it should patch an existing post', (done) =>{
            const postId = 1;
            const post = {
                name: 'post 1 patch',
            };
            chai.request(server)
            .patch('/api/posts' +postId)
            .send(post)
            .end((err,response) =>{
                response.should.have.status(200);
                response.body.should.have.a('object');
                response.body.should.have.property('id').eq(1);
                response.body.should.have.property('name').eq('post 1 patch');
                response.body.should.property('completed').eq(true);
            done();
            });
        });
        it('it should not patch an existing post with a name less than 3 characters', (done) =>{
            const postId = 1;
            const post = {
                name: 'po',
            };
            chai.request(server)
            .patch('/api/posts' +postId)
            .send(post)
            .end((err,response) =>{
                response.should.have.status(404);
                //response.body.should.have.property('name must be longer than 2 characters!')
            done();
            });
        });
    });

    //Test the DELETE route

    describe('DELETE/api/posts/:postId', ()=>{
        it('it should delete an existing post', (done) =>{
            const postId = 1;
            chai.request(server)
            .delete('/api/posts' +postId)
            .end((err,response) =>{
                response.should.have.status(200);
            done();
            });
        });
        it('it should  not delete a post that is not in the database', (done) =>{
            const postId = 145;
            chai.request(server)
            .delete('/api/posts' +postId)
            .end((err,response) =>{
                response.should.have.status(404);
                //response.text.should.have.property('PostId not found');
            done();
            });
        });
    });
});
