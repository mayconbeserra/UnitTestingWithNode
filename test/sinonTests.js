'use strict';

var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

chai.should();

describe('sinon tests', function() {
  var student;

  beforeEach(function() {
    student = {
      dropClass: function(classId, cb) {
        //do stuff
        cb();
      }
    };
  });

  describe('student.dropClass', function() {
    it('should call the callback', function() {
      var spy = sinon.spy();

      student.dropClass(1, spy);
      spy.called.should.be.true;
    });
  });
});
