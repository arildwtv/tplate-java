'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.javaMethodSegment = javaMethodSegment;

var _javaAnnotationSegment = require('./javaAnnotationSegment');

var _javaParameterSegment = require('./javaParameterSegment');

var _javaGenericTypeSegment = require('./javaGenericTypeSegment');

function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function methodGenericTypeSegment(genericTypes) {
  return genericTypes.length ? (0, _javaGenericTypeSegment.javaGenericTypeSegment)(genericTypes) + ' ' : '';
}

function methodReturnSegment(returnType) {
  return typeof returnType === 'string' ? returnType : '' + returnType.type + (0, _javaGenericTypeSegment.javaGenericTypeSegment)(returnType.genericTypes);
}

function methodSignatureSegment(accessModifier, scope, genericTypes, returnType, name) {
  return accessModifier + ' ' + scopeSegment(scope) + methodGenericTypeSegment(genericTypes) + (methodReturnSegment(returnType) + ' ' + name);
}

function methodSegmentWithoutParameters(tplate, _ref) {
  var accessModifier = _ref.accessModifier;
  var scope = _ref.scope;
  var genericTypes = _ref.genericTypes;
  var returnType = _ref.returnType;
  var name = _ref.name;
  var annotations = _ref.annotations;
  var body = _ref.body;
  var t = tplate.t;
  var indent = tplate.indent;

  return t(annotations.map(_javaAnnotationSegment.javaAnnotationSegment), methodSignatureSegment(accessModifier, scope, genericTypes, returnType, name) + '() {', body ? indent(body(tplate)) : undefined, '}');
}

function methodSegmentWithParameters(tplate, _ref2) {
  var accessModifier = _ref2.accessModifier;
  var scope = _ref2.scope;
  var genericTypes = _ref2.genericTypes;
  var returnType = _ref2.returnType;
  var name = _ref2.name;
  var parameters = _ref2.parameters;
  var annotations = _ref2.annotations;
  var body = _ref2.body;
  var t = tplate.t;
  var indent = tplate.indent;
  var map = tplate.map;

  return t(annotations.map(_javaAnnotationSegment.javaAnnotationSegment), methodSignatureSegment(accessModifier, scope, genericTypes, returnType, name) + '(', indent(map(parameters, _javaParameterSegment.javaParameterSegment)), body ? indent(body(tplate)) : undefined, '}');
}

function javaMethodSegment() {
  var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref3$accessModifier = _ref3.accessModifier;
  var accessModifier = _ref3$accessModifier === undefined ? 'public' : _ref3$accessModifier;
  var _ref3$scope = _ref3.scope;
  var scope = _ref3$scope === undefined ? 'instance' : _ref3$scope;
  var _ref3$genericTypes = _ref3.genericTypes;
  var genericTypes = _ref3$genericTypes === undefined ? [] : _ref3$genericTypes;
  var _ref3$returnType = _ref3.returnType;
  var returnType = _ref3$returnType === undefined ? 'void' : _ref3$returnType;
  var _ref3$name = _ref3.name;
  var name = _ref3$name === undefined ? 'method' : _ref3$name;
  var _ref3$parameters = _ref3.parameters;
  var parameters = _ref3$parameters === undefined ? [] : _ref3$parameters;
  var _ref3$annotations = _ref3.annotations;
  var annotations = _ref3$annotations === undefined ? [] : _ref3$annotations;
  var body = _ref3.body;

  var args = {
    accessModifier: accessModifier,
    scope: scope,
    genericTypes: genericTypes,
    returnType: returnType,
    name: name,
    parameters: parameters,
    annotations: annotations,
    body: body
  };

  return function (tplate) {
    return parameters.length === 0 ? methodSegmentWithoutParameters(tplate, args) : methodSegmentWithParameters(tplate, args);
  };
}