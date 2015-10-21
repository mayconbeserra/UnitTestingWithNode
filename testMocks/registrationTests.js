'use strict';

var Course = require("../testMocks/Course");
var Student = require("../testMocks/Student");
var Registration = require("../models/Registration");
var DataLoader = require("../common/DataLoader");
var chai = require("chai");
var sinon = require("sinon");

chai.should();

describe("Registration", function() {
  var dataLoader,
      student,
      course,
      registration;

  beforeEach(function() {
    //Creating the mock for the dataLoader
    dataLoader = sinon.stub(new DataLoader());
    course = Course.create(dataLoader);
    student = Student.create(dataLoader);

    dataLoader.saveCourseSync.returns(true);
    dataLoader.getStudentSync.returns({
      name: "Susan",
      id: 1
    });
  });

  it("doesn't call save if the course is full", function() {
    var registration = Registration.create(course, student);
    dataLoader.getCourseSync.returns({
      maxSize: 2,
      students: [{id: 2}, {id: 3}],
      id: 1
    });

    registration.registerStudentForCourse(1, 1);

    sinon.assert.notCalled(dataLoader.saveCourseSync);
  });

  it("does call save if the course is full", function() {
    var registration = Registration.create(course, student);
    dataLoader.getCourseSync.returns({
      maxSize: 3,
      students: [{id:2}, {id:3}],
      id: 1
    });

    registration.registerStudentForCourse(1, 1);

    sinon.assert.called(dataLoader.saveCourseSync);
  });

});
