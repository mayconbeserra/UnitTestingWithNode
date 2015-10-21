'use strict';

var uuid = require('uuid');

function Student() {}

Student._load = function(studentId) {
  return new Student(DataLoader.getStudentSync(studentId));
};

Student.create = function(name, grade) {
  var student = new Student();

  student.name = name;
  student.grade = grade;
  student.id = uuid.v4();

  return student;
};

var _p = Student.prototype;

_p.advanceGrade = function() {
  this.grade++;
};

_p._save = function() {
  var me = this;
  var toSave = {};

  Object.keys(me).forEach(function(key) {
    if (key.indexOf("_") !== 0) {
      toSave[key] = me[key];
    }
  });

  return DataLoader.saveStudent(me.id, toSave);
}

_p.toString = function() {
  return this.id + "\t" + this.name;
};

module.exports = Student;
