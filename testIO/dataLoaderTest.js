'use strict';

var DataLoader = require('../common/DataLoader');
var chai = require('chai');
var should = chai.should();
var dataLoader = new DataLoader();

describe('DataLoader tests', function() {

  it('gets a student synchronously', function() {
    var student = dataLoader.getStudentSync(1);

    should.exist(student.name);
    student.name.should.equal("Maycon");
    student.email.should.equal("maycon@maycon.com");

  });

  it('gets a student asynchronously', function(done) {
    var student = dataLoader.getStudent(1, function(student) {
      should.exist(student.name);
      student.name.should.equal("Maycon");
      done();
    });
  });

});
