'use strict';

var chai = require('chai');
var sinon = require('sinon');
var assert = require('assert');
var expect = chai.expect;

chai.should();

describe('sinon tests', function() {
  var student;
  var schedule;

  beforeEach(function() {
    student = {
      courses: new Array('Default'),
      dropClass: function(classId, cb) {
        //do stuff
        if (!!cb.dropClass) {
          cb.dropClass();
        } else {
          cb();
        }
      },
      addCourse: function(courseName) {
        console.log(this.courses.length);
      },
      addClass: function(schedule) {
        if (!schedule.classIsFull()) {
          return true;
        } else {
          return false;
        }
      }
    };

    schedule = {
      dropClass: function() {
        console.log('class dropped');
      },
      classIsFull: function() {
        return true;
      }
    };
  });

  describe('student.dropClass', function() {
    it('should call the callback', function() {
      var spy = sinon.spy();

      student.dropClass(1, spy);
      spy.called.should.be.true;
    });

    it('should call the callback and log to the console', function() {
      function onClassDropped() {
        console.log('onClassDropped was called');
      }

      var spy = sinon.spy(onClassDropped);

      student.dropClass(1, spy);
      spy.called.should.be.true;
    });

    it('should call the callback even if it is a method of an object', function() {
      //the code below replaces the schedule.dropClass to be monitored
      sinon.spy(schedule, 'dropClass');
      student.dropClass(1, schedule);
      schedule.dropClass.called.should.be.true;
    });

    it('Should add the course for the student', function() {
      student.addCourse('teste1');
      assert.ok(student.courses.length > 0);
    });
  });

  describe('student with stubs', function() {

    it('should call a stubbed method', function() {
      var stub = sinon.stub(schedule);

      student.dropClass(1, stub.dropClass);
      stub.dropClass.called.should.be.true;
    });

    it('should return true when the class is not full', function() {
      var stub = sinon.stub(schedule);
      var returnVal = student.addClass(schedule);

      stub.classIsFull.returns(false);
      returnVal.should.be.true;
    });

  });

  describe('student with mocks', function() {
    it('mocks schedule', function() {
      var mockObj = sinon.mock(schedule);
      var expectation = mockObj.expects('classIsFull').once();

      student.addClass(schedule);
      expectation.verify();
    });
  });

});
