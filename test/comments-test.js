const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const { object } = require('joi');
const server = require('../app.js');

// Assertion Style
chai.should();

chai.use(chaiHttp);

let token = process.env.TOKEN;

//Testing the comments endpoints
describe( 'POST/api/comment', ()=>{
    it('it should post a new comment', (done)=>{
        const comment ={
            title: 'comment 1',
            commentbody: 'wwe yeeeeeeeeeeeeeeeeee',
            completed: false,
        };
        chai.request(server)
        .post('/posts/:postId' + comment)
        .set(token)
        .send(comment)
        .end((err,response) =>{
            response.should.have.status(200);
            response.body.message.should.be.eq('array');
        done();
        });
    });
    it('it should not post a comment', (done)=>{
        const comment ={
            completed: false,
        };
        chai.request(server)
        .post('/posts/:postId' + comment)
        .send(comment)
        .end((err,response) =>{
            response.should.have.status(404);
            //response.body.message.should.have.property('file not found')
        done();
        });
    });
});