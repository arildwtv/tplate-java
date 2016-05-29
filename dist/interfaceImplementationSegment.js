'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interfaceImplementationSegment = interfaceImplementationSegment;

var _genericTypeSegment = require('./genericTypeSegment');

function interfaceImplementationSegment(_ref) {
  var type = _ref.type;
  var _ref$genericTypes = _ref.genericTypes;
  var genericTypes = _ref$genericTypes === undefined ? [] : _ref$genericTypes;

  return '' + type + (0, _genericTypeSegment.genericTypeSegment)(genericTypes);
}