'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldSegment = fieldSegment;

var _genericTypeSegment = require('./genericTypeSegment');

var _util = require('./util');

var _accessModifierSegment = require('./accessModifierSegment');

var _annotationSegment = require('./annotationSegment');

function fieldSegment() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$annotations = _ref.annotations;
  var annotations = _ref$annotations === undefined ? [] : _ref$annotations;
  var _ref$accessModifier = _ref.accessModifier;
  var accessModifier = _ref$accessModifier === undefined ? 'private' : _ref$accessModifier;
  var _ref$scope = _ref.scope;
  var scope = _ref$scope === undefined ? 'instance' : _ref$scope;
  var _ref$final = _ref.final;
  var final = _ref$final === undefined ? true : _ref$final;
  var _ref$type = _ref.type;
  var type = _ref$type === undefined ? 'String' : _ref$type;
  var _ref$genericTypes = _ref.genericTypes;
  var genericTypes = _ref$genericTypes === undefined ? [] : _ref$genericTypes;
  var name = _ref.name;
  var assign = _ref.assign;

  var scopeString = scope === 'class' ? 'static ' : '';
  var finalString = final ? 'final ' : '';
  return function (tplate) {
    var t = tplate.t;

    var assignString = assign ? ' = ' + (0, _util.getValueOrRenderSegment)(tplate, assign) : '';
    return t(annotations.map(_annotationSegment.annotationSegment), '' + (0, _accessModifierSegment.accessModifierSegment)(accessModifier) + scopeString + finalString + ('' + type + (0, _genericTypeSegment.genericTypeSegment)(genericTypes) + ' ' + name + assignString + ';'));
  };
}