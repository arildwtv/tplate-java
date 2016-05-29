'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constructorSegment = constructorSegment;

var _annotationSegment = require('./annotationSegment');

var _parameterSegment = require('./parameterSegment');

var _accessModifierSegment = require('./accessModifierSegment');

function constructorSegmentWithoutParameters(tplate, _ref) {
  var accessModifier = _ref.accessModifier;
  var name = _ref.name;
  var annotations = _ref.annotations;
  var body = _ref.body;
  var t = tplate.t;
  var indent = tplate.indent;

  return t(annotations.map(_annotationSegment.annotationSegment), '' + (0, _accessModifierSegment.accessModifierSegment)(accessModifier) + name + '() {', body ? indent(body(tplate)) : undefined, '}');
}

function constructorSegmentWithParameters(tplate, _ref2) {
  var accessModifier = _ref2.accessModifier;
  var name = _ref2.name;
  var parameters = _ref2.parameters;
  var annotations = _ref2.annotations;
  var body = _ref2.body;
  var t = tplate.t;
  var indent = tplate.indent;
  var map = tplate.map;

  return t(annotations.map(_annotationSegment.annotationSegment), '' + (0, _accessModifierSegment.accessModifierSegment)(accessModifier) + name + '(', indent(map(parameters, _parameterSegment.parameterSegment)), body ? indent(body(tplate)) : undefined, '}');
}

function constructorSegment() {
  var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref3$accessModifier = _ref3.accessModifier;
  var accessModifier = _ref3$accessModifier === undefined ? 'public' : _ref3$accessModifier;
  var _ref3$name = _ref3.name;
  var name = _ref3$name === undefined ? 'MyClass' : _ref3$name;
  var _ref3$parameters = _ref3.parameters;
  var parameters = _ref3$parameters === undefined ? [] : _ref3$parameters;
  var _ref3$annotations = _ref3.annotations;
  var annotations = _ref3$annotations === undefined ? [] : _ref3$annotations;
  var body = _ref3.body;

  var args = { accessModifier: accessModifier, name: name, parameters: parameters, annotations: annotations, body: body };
  return function (tplate) {
    return parameters.length === 0 ? constructorSegmentWithoutParameters(tplate, args) : constructorSegmentWithParameters(tplate, args);
  };
}