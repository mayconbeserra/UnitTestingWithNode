'use strict';

var Promise = require("bluebird");
var chai = require("chai");
var chaiPromised = require("chai-as-promised");
var should = chai.should();

chai.use(chaiPromised);
var student = { name: "Maycon Beserra", id: 1};

var dataAccess = {
  getStudent: function(id) {
    if (id === 1) {
      return Promise.resolve(student);
    } else {
      return Promise.reject("Invalid student id");
    }
  }
};

describe("TestPromises", function() {

  it("uses the done function", function(done){
    dataAccess.getStudent(1).then(function(student) {
      student.id.should.equal(1);
      done();
    });
  });

  it("fulfills the promise", function() {
    return dataAccess.getStudent(1);
  });

  it("fulfills the promise with the correct student", function() {
    return dataAccess.getStudent(1).should.eventually.equal(student);
  });

});
