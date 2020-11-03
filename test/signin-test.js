const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const { object, required } = require('joi');
const server = require('../app.js');

// Assertion Style
chai.should();

chai.use(chaiHttp);

//Testing the Signin endpoint
describe('POST/api/signin', ()=>{
    it('it should be able to signin', (done) =>{
        const user ={
            email: process.env.email,
            password: process.env.PASSWORD
        }
        chai.request(server)
        .post('/api/signin')
        .send(user)
        .end((err,response) =>{
            response.should.have.status(200);
            response.body.should.have.property('array');
        done();
        });
    });
    it('it should not signin when user/password is not correct', (done)=>{
        const user = {
            email: 'string',
            password: 'String',
            required: true
        }
        chai.request(server)
        .post('/api/signin')
        .send(user)
        .end((err,response) =>{
            response.should.have.status(400);
           // response.body.should.have.property('Object');
           // response.body.message.token.should.have.property('array');
            //response.text.should.be.a('username/password is not correct!');
        done();
        });
    });
})