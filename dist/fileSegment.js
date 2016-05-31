'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileSegment = fileSegment;

var _packageSegment = require('./packageSegment');

var _importSegment = require('./importSegment');

var _enumSegment = require('./enumSegment');

var _interfaceSegment = require('./interfaceSegment');

var _classSegment = require('./classSegment');

function fileSegment() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var inPackage = _ref.inPackage;
  var _ref$imports = _ref.imports;
  var imports = _ref$imports === undefined ? [] : _ref$imports;
  var javaClass = _ref.javaClass;
  var javaEnum = _ref.javaEnum;
  var javaInterface = _ref.javaInterface;

  return function (_ref2) {
    var t = _ref2.t;
    return t(inPackage ? (0, _packageSegment.packageSegment)(inPackage) : undefined, inPackage ? '' : undefined, imports.length ? imports.map(_importSegment.importSegment) : undefined, imports.length ? '' : undefined, javaEnum ? (0, _enumSegment.enumSegment)(javaEnum) : undefined, javaInterface ? (0, _interfaceSegment.interfaceSegment)(javaInterface) : undefined, !javaEnum && !javaInterface ? (0, _classSegment.classSegment)(javaClass) : undefined, '');
  };
}