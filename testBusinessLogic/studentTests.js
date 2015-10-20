'use strict';

var student = require('../models/Student');
var course = require('../models/Course');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

describe("Student tests", function() {
  var studentName = "Maycon";
  var studentGrade = 5;

  it("should save the info on the student and create an id when created", function(){
    var newStudent = student.create(studentName, studentGrade);

    should.exist(student.name);
    newStudent.name.should.equal(studentName);

    should.exist(newStudent.grade);
    newStudent.grade.should.equal(studentGrade);

    should.exist(newStudent.id);
  });

  it("should increase the student grade by 1 when advanceGrade is called", function() {
    var newStudent = student.create(studentName, studentGrade);

    newStudent.advanceGrade();

    newStudent.grade.should.equal(studentGrade + 1);
  });
});
