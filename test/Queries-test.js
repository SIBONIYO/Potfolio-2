const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const { object } = require('joi');
const server = require('../app.js');

// Assertion Style
chai.should();

chai.use(chaiHttp);


//Testing Queries endpoints
describe('POST/api/Queries', ()=>{
    it('it should post a new query', (done) =>{
        const Query = {
            name: 'new query',
            description: 'new desc',
            completed: false,
        };
        chai.request(server)
        .post('/api/Queries')
        .send(Query)
        .end((err,response) =>{
            response.should.have.status(401);
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
        .set('Authorization', 'eyJhbGciOiJIUzI1NiJ9.c2lib25peW9AZ21haWwuY29t.iVwTelManISmjRri7kjhYP7kT-4VUDTlLfid-lEsy9o')
        .send(Query)
        .end((err,response) =>{
            response.should.have.status(401);
            //response.text.should.be.a('Access denied!');
        done();
        });
    });
});