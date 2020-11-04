const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const { object } = require('joi');
const server = require('../app.js');

// Assertion Style
chai.should();

chai.use(chaiHttp);

let token;
// Getting Token first
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
//Testing Queries endpoints
describe('POST/api/Queries', ()=>{
    it('it should post a new query', (done) =>{
        const Query = {
            name: 'new query',
            description: 'new desc',
            required: true,
        };
        chai.request(server)
        .post('/api/Queries')
        .set('auth', token)
        .send(Query)
        .end((err,response) =>{
            response.should.have.status(201);
           // response.text.should.be.a('Access denied!');
        done();
        });
    });
    it('it should not post a query', (done)=>{
        const Query ={
            completed: false,
        };
        chai.request(server)
        .post('/api/Queries')
        .set('auth', token)
        .send(Query)
        .end((err,response) =>{
            response.should.have.status(404);
            //response.text.should.be.a('Access denied!');
        done();
        });
    });
});
   //Testing Get route
describe('GET /api/Queries', () => {
    it('it should get all the queries', (done) => {
        chai.request(server)
            .get("/api/queries")
            .set('auth', token)
            .end((err, response) => {
                response.should.have.status(200);
                //response.body.message.should.have.property('array');
            done();
        });
    })
    it('it should not get all the queries', (done) => {
        chai.request(server)
            .get('/api/quries')
            .set('auth', token)
            .end((err, response) => {
                response.should.have.status(404);
                 //response.text.should.be.a('route not found')
            done();
            });
        });
    });
})
