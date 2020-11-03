const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const { object } = require('joi');
const server = require('../app.js');

// Assertion Style
chai.should();

chai.use(chaiHttp);

let token;
let postId

describe('Posts API', () => {
    describe('signin', () => {
        it('it should be able to signin', (done) =>{
            const user ={
                email: process.env.email,
                password: process.env.PASSWORD
            }
            chai.request(server)
            .post('/api/signin')
            .send(user)
            .end((err,response) =>{
                token = response.body.token
                response.should.have.status(200);
               // response.body.should.have.property('array');
            done();
        });
    });

    })
        //Testing Get route
        describe('GET /api/posts', () => {
            it('it should get all the posts', (done) => {
                chai.request(server)
                    .get("/api/posts")
                    .end((err, response) => {
                        response.should.have.status(200);
                        // response.body.message.should.be('success');
                        done();
                    });
            })
            it('it should not get all the posts', (done) => {
                chai.request(server)
                    .get('/api/pot')
                    .end((err, response) => {
                        response.should.have.status(404);
                        //response.text.should.be.a('route not found')
                        done();
                    });
            });
        })

        //Test the GET (by Id) route
        describe('GET /api/posts', () => {
            it('it should get a post by Id', (done) => {
                const postId = process.env.TOKEN;
                chai.request(server)
                    .get('/api/posts/' + postId)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('Object');
                        done();
                    });
            });
            it('it should not get a post by Id', (done) => {
                const postId = '';
                chai.request(server)
                    .get('/api/post/' + postId)
                    .end((err, response) => {
                        response.should.have.status(404);
                        //response.body.should.be.a('route not found');
                        done();
                    });
            });
        });
        //Test the POST route
        describe('POST/api/posts', () => {
            it('it should post a new post', (done) => {
                const post = {
                    title: 'post 4',
                    description: 'we got you',
                    completed: false,
                };
                chai.request(server)
                    .post('/api/posts')
                    .set('auth', token)
                    .send(post)
                    .end((err, response) => {
                       postId = response.body._id
                        response.should.have.status(201);
                        //response.text.should.be.a('Access denied');
                        done();
                    });
            });
            it('it should not post', (done) => {
                const post = {
                    completed: false,
                };
                chai.request(server)
                    .post('/api/posts')
                    .set('auth', token)
                    .send(post)
                    .end((err, response) => {
                        response.should.have.status(500);
                        //response.text.should.be.a('Error found when trying to post');
                        done();
                    })
            })
        })

        //Test the PATCH route
        describe('PATCH/api/posts/:postId', () => {
            it('it should patch an existing post', (done) => {
                const post = {
                    name: 'post 1 patch',
                };
                chai.request(server)
                    .patch('/api/posts/:' + postId)
                    .send(post)
                    .end((err, response) => {
                        response.should.have.status(401);
                        response.body.should.be.a('object');
                        done();
                    });
            });
            it('it should not patch an existing post with a name less than 3 characters', (done) => {
                const post = {
                    name: 'po',
                };
                chai.request(server)
                    .patch('/api/posts' + postId)
                    .send(post)
                    .end((err, response) => {
                        response.should.have.status(404);
                        //response.body.should.be.a('route not found')
                        done();
                    });
            });
        });

        //Test the DELETE route

        describe('DELETE/api/posts/:postId', () => {
            it('it should delete an existing post', (done) => {
                chai.request(server)
                    .delete('/api/posts/' + postId)
                    .end((err, response) => {
                        response.should.have.status(401);
                        response.body.should.be.a('Object');
                        done();
                    });
            });
            it('it should  not delete a post that is not in the database', (done) => {
                chai.request(server)
                    .delete('/api/posts/' + postId)
                    .end((err, response) => {
                        response.should.have.status(401);
                        // response.body.should.be.a('Access denied');
                        done();
                    });
            });
        });
    });
