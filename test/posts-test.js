const chai = require("chai");
const chaiHttp = require("chai-http");
const { response } = require("express");
const { object } = require("joi");
const server = require("../app.js");

// Assertion Style
chai.should();

chai.use(chaiHttp);

let token;
let postId;

describe("posts", () => {
  beforeEach((done) => {
    //before each test we empty the database
    post.remove({}, (err) => {
      done();
    });
  });
});

describe("Posts API", () => {
  it("it should be able to signin", (done) => {
    const user = {
      email: process.env.email,
      password: process.env.PASSWORD,
    };
    chai
      .request(server)
      .post("/api/signin")
      .send(user)
      .end((err, response) => {
        token = response.body.token;
        response.should.have.status(200);
        // response.body.should.have.property('array');
        done();
      });
  });

  //Testing Get route
  it("it should get all the posts", (done) => {
    chai
      .request(server)
      .get("/api/posts")
      .end((err, response) => {
        response.should.have.status(200);
        // response.body.message.should.be('success');
        done();
      });
  });

  //Test the GET (by Id) route
 
  //Test the POST route
  it("it should post a new post", (done) => {
    const post = {
      title: "post 4",
      description: "we got you",
      completed: false,
    };
    chai
      .request(server)
      .post("/api/posts")
      .set("auth", token)
      .send(post)
      .end((err, response) => {
        postId = response.body._id;
        response.should.have.status(201);
        //response.text.should.be.a('Access denied');
        done();
      });
  });
  it("it should get a post by Id", (done) => {
    chai
      .request(server)
      .get("/api/posts/" + postId)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("Object");
        done();
      });
  });
  it("it should not post with invalid token", (done) => {
    chai
      .request(server)
      .post("/api/posts/")
      .set('auth', 'ffff')
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a("Object");
        done();
      });
  });
  it("it should not post with no token", (done) => {
    chai
      .request(server)
      .post("/api/posts/")
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.be.a("Object");
        done();
      });
  });
  //Testing the comments endpoints
  it("it should post a new comment", (done) => {
    const comment = {
      name: "comment 1",
      commentbody: "wwe yeeeeeeeeeeeeeeeeee",
      completed: false,
    };
    chai
      .request(server)
      .post("/api/posts/" + postId + "/comments")
      .send(comment)
      .end((err, response) => {
        response.should.have.status(201);
        // response.body.message.should.be.eq("array");
        done();
      });
  });
  it("it should not post a comment", (done) => {
    const comment = {
      completed: false,
    };
    chai
      .request(server)
      .post("/api/posts/" + 'fffff' + "/comments")
      .send(comment)
      .end((err, response) => {
        response.should.have.status(500);
        //response.body.message.should.have.property('file not found')
        done();
      });
  });
  //Test the PATCH route
  it("it should patch an existing post", (done) => {
    const post = {
      name: "post 1 patch",
    };
    chai
      .request(server)
      .patch("/api/posts/" + postId)
      .set('auth', token)
      .send(post)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a("object");
        done();
      });
  });

  //Test the DELETE route

  it("it should delete an existing post", (done) => {
    chai
      .request(server)
      .delete("/api/posts/" + postId)
      .set("auth", token)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a("Object");
        done();
      });
  });
});
