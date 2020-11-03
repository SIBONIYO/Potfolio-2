const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const { object } = require('joi');
const server = require('../app.js');

// Assertion Style
chai.should();

chai.use(chaiHttp);

//Testing the AUTH endpoint
describe('POST/api/register', ()=>{
    it('it should register a new user', (done) =>{
        const user = {
            email: 'siboniyo@gmail.com',
            password: '111111',
            completed: false,
        };
        chai.request(server)
        .post('/api/register')
        .send(user)
        .end((err,response) =>{
            response.should.have.status(404);
            //response.body.should.have.property('Object');
            //response.body.message.should.be.a('array');
        done();
        });
    });
    it('it should not register a new user', (done)=>{
        const user ={
            completed: false,
        };
        chai.request(server)
        .post('/api/register')
        .send(user)
        .end((err,response) =>{
            response.should.have.status(404);
            //response.text.should.be.a('Err');
        done();
        });
    });
});
