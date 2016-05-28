'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.javaInterfaceImplementationSegment = javaInterfaceImplementationSegment;

var _javaGenericTypeSegment = require('./javaGenericTypeSegment');

function javaInterfaceImplementationSegment(_ref) {
  var name = _ref.name;
  var _ref$genericTypes = _ref.genericTypes;
  var genericTypes = _ref$genericTypes === undefined ? [] : _ref$genericTypes;

  return '' + name + (0, _javaGenericTypeSegment.javaGenericTypeSegment)(genericTypes);
}