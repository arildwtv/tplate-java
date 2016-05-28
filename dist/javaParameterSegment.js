'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.javaParameterSegment = javaParameterSegment;

var _javaAnnotationSegment = require('./javaAnnotationSegment');

function javaParameterSegment() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var name = _ref.name;
  var _ref$type = _ref.type;
  var type = _ref$type === undefined ? 'String' : _ref$type;
  var _ref$final = _ref.final;
  var final = _ref$final === undefined ? true : _ref$final;
  var _ref$annotations = _ref.annotations;
  var annotations = _ref$annotations === undefined ? [] : _ref$annotations;

  var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var IS_LAST = _ref2.IS_LAST;

  return function (_ref3) {
    var t = _ref3.t;
    return t(annotations.map(_javaAnnotationSegment.javaAnnotationSegment), '' + (final ? 'final ' : '') + type + ' ' + name + (IS_LAST ? ') {' : ','));
  };
}