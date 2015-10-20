'use strict';

var student = require('../models/Student');
var course = require('../models/Course');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;


describe("Course Tests", function(){

  var newStudent = student.create("Maycon", 5);
  var courseName = "Introduction to unit testing with NodeJS";
  var courseCode = "UNTNJS";
  var courseDescription = "Learning how to create unit testing with node";

  it('should save data correctly', function(){
    var newCourse = course.create(courseName, courseCode, courseDescription);

    should.exist(newCourse.name);
    should.exist(newCourse.code);
    should.exist(newCourse.description);

    should.exist(newCourse.students);
    newCourse.students.should.eql([]);
  });

  describe("RegisterStudent", function() {

    it('should add student to the students array', function(){
      var newCourse = course.create(courseName, courseCode, courseDescription);

      newCourse.registerStudent(newStudent);

      newCourse.students.length.should.equal(1);
      newCourse.students[0].id.should.equal(newStudent.id);

    });

  });

  describe("UnregisterStudent", function() {

    it('should we throw an error if we try to remove a student that isnt in the instance', function() {
      var newCourse = course.create(courseName, courseCode, courseDescription);

      expect(function() {
        newCourse.unregisterStudent("");
      }).to.throw();
    });

  });

  describe("AddTimes", function() {

    it('should add the given days/times to the course', function() {
      var newCourse = course.create(courseName, courseCode, courseDescription);
      var days = ["Monday", "Wednesday", "Friday"];
      var times = ["10:00", "14:00"];

      newCourse.addTimes(days, times);

      newCourse.times.length.should.equal(6);
      newCourse.times[2].should.eql({
        day: "Wednesday", time: "10:00"
      });
    });

    it('should not add a non-day to the times array', function() {
      var newCourse = course.create(courseName, courseCode, courseDescription);
      var day = "fabulousday", time = "10:00";

      expect(function() {
        newCourse.addTimes(day, time);
      }).to.throw();
    });

  });

});
