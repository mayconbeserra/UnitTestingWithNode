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
      }
    };

    schedule = {
      dropClass: function() {
        console.log('class dropped');
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

});
