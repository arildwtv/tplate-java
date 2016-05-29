'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.javaMethodSegment = javaMethodSegment;

var _javaAnnotationSegment = require('./javaAnnotationSegment');

var _javaParameterSegment = require('./javaParameterSegment');

var _javaGenericTypeSegment = require('./javaGenericTypeSegment');

var _javaAccessModifierSegment = require('./javaAccessModifierSegment');

function abstractSegment(abstract) {
  return abstract ? 'abstract ' : '';
}
function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function methodGenericTypeSegment(genericTypes) {
  return genericTypes.length ? (0, _javaGenericTypeSegment.javaGenericTypeSegment)(genericTypes) + ' ' : '';
}

function methodReturnSegment(returnType) {
  return typeof returnType === 'string' ? returnType : '' + returnType.type + (0, _javaGenericTypeSegment.javaGenericTypeSegment)(returnType.genericTypes);
}

function methodSignatureSegment(_ref) {
  var accessModifier = _ref.accessModifier;
  var abstract = _ref.abstract;
  var scope = _ref.scope;
  var genericTypes = _ref.genericTypes;
  var returnType = _ref.returnType;
  var name = _ref.name;

  return '' + (0, _javaAccessModifierSegment.javaAccessModifierSegment)(accessModifier) + abstractSegment(abstract) + ('' + scopeSegment(scope) + methodGenericTypeSegment(genericTypes)) + (methodReturnSegment(returnType) + ' ' + name);
}

function methodSegmentWithoutParameters(tplate, _ref2) {
  var accessModifier = _ref2.accessModifier;
  var abstract = _ref2.abstract;
  var scope = _ref2.scope;
  var genericTypes = _ref2.genericTypes;
  var returnType = _ref2.returnType;
  var name = _ref2.name;
  var annotations = _ref2.annotations;
  var body = _ref2.body;
  var t = tplate.t;
  var indent = tplate.indent;

  var methodSignature = { accessModifier: accessModifier, abstract: abstract, scope: scope, genericTypes: genericTypes, returnType: returnType, name: name };
  return t(annotations.map(_javaAnnotationSegment.javaAnnotationSegment), abstract ? methodSignatureSegment(methodSignature) + '();' : methodSignatureSegment(methodSignature) + '() {', body ? indent(body(tplate)) : undefined, abstract ? undefined : '}');
}

function methodSegmentWithParameters(tplate, _ref3) {
  var accessModifier = _ref3.accessModifier;
  var abstract = _ref3.abstract;
  var scope = _ref3.scope;
  var genericTypes = _ref3.genericTypes;
  var returnType = _ref3.returnType;
  var name = _ref3.name;
  var parameters = _ref3.parameters;
  var annotations = _ref3.annotations;
  var body = _ref3.body;
  var t = tplate.t;
  var indent = tplate.indent;
  var map = tplate.map;

  var methodSignature = { accessModifier: accessModifier, abstract: abstract, scope: scope, genericTypes: genericTypes, returnType: returnType, name: name };

  var abstractAwareParameters = parameters.map(function (p) {
    return Object.assign({}, p, { afterLastParameter: abstract ? ');' : ') {' });
  });

  return t(annotations.map(_javaAnnotationSegment.javaAnnotationSegment), methodSignatureSegment(methodSignature) + '(', indent(map(abstractAwareParameters, _javaParameterSegment.javaParameterSegment)), body ? indent(body(tplate)) : undefined, abstract ? undefined : '}');
}

function javaMethodSegment() {
  var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref4$accessModifier = _ref4.accessModifier;
  var accessModifier = _ref4$accessModifier === undefined ? 'public' : _ref4$accessModifier;
  var _ref4$abstract = _ref4.abstract;
  var abstract = _ref4$abstract === undefined ? false : _ref4$abstract;
  var _ref4$scope = _ref4.scope;
  var scope = _ref4$scope === undefined ? 'instance' : _ref4$scope;
  var _ref4$genericTypes = _ref4.genericTypes;
  var genericTypes = _ref4$genericTypes === undefined ? [] : _ref4$genericTypes;
  var _ref4$returnType = _ref4.returnType;
  var returnType = _ref4$returnType === undefined ? 'void' : _ref4$returnType;
  var _ref4$name = _ref4.name;
  var name = _ref4$name === undefined ? 'method' : _ref4$name;
  var _ref4$parameters = _ref4.parameters;
  var parameters = _ref4$parameters === undefined ? [] : _ref4$parameters;
  var _ref4$annotations = _ref4.annotations;
  var annotations = _ref4$annotations === undefined ? [] : _ref4$annotations;
  var body = _ref4.body;

  var args = {
    accessModifier: accessModifier,
    abstract: abstract,
    scope: scope,
    genericTypes: genericTypes,
    returnType: returnType,
    name: name,
    parameters: parameters,
    annotations: annotations,
    body: abstract ? undefined : body
  };

  return function (tplate) {
    return parameters.length === 0 ? methodSegmentWithoutParameters(tplate, args) : methodSegmentWithParameters(tplate, args);
  };
}