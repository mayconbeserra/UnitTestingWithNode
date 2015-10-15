'use strict';

var chai = require('chai'),
    expect = chai.expect;

chai.should();

function isEven(num) {
  return num % 2 === 0;
}

function add(num1, num2) {
  return num1 + num2;
}

describe('isEven', function () {
  it('should return true when number is even', function(){
    isEven(4).should.be.true;
  });

  it('should return false whem number is odd', function(){
    expect(isEven(5)).to.be.false;
  });
});

describe('add without setup/teardown', function() {
  var num;

  beforeEach(function() {
    num = 5;
  });

  it('should be ten when adding 5 to 5', function(){
    num = add(num, 5);
    num.should.equal(10);
  });

  it('should be twelve when adding 7 to 5', function(){
    add(num, 7).should.equal(12);
  });
});
