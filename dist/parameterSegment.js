'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parameterSegment = parameterSegment;

var _annotationSegment = require('./annotationSegment');

var _genericTypeSegment = require('./genericTypeSegment');

function finalSegment(final) {
  return final ? 'final ' : '';
}
function parameterGenericTypeSegment(genericTypes) {
  return genericTypes.length ? (0, _genericTypeSegment.genericTypeSegment)(genericTypes) : '';
}

function parameterSegment() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var name = _ref.name;
  var _ref$type = _ref.type;
  var type = _ref$type === undefined ? 'String' : _ref$type;
  var _ref$genericTypes = _ref.genericTypes;
  var genericTypes = _ref$genericTypes === undefined ? [] : _ref$genericTypes;
  var _ref$final = _ref.final;
  var final = _ref$final === undefined ? true : _ref$final;
  var _ref$annotations = _ref.annotations;
  var annotations = _ref$annotations === undefined ? [] : _ref$annotations;
  var _ref$afterLastParamet = _ref.afterLastParameter;
  var afterLastParameter = _ref$afterLastParamet === undefined ? ') {' : _ref$afterLastParamet;

  var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var IS_LAST = _ref2.IS_LAST;

  return function (_ref3) {
    var t = _ref3.t;
    return t(annotations.map(_annotationSegment.annotationSegment), '' + finalSegment(final) + type + parameterGenericTypeSegment(genericTypes) + ' ' + ('' + name + (IS_LAST ? afterLastParameter : ',')));
  };
}