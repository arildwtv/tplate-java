'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interfaceSegment = interfaceSegment;

var _annotationSegment = require('./annotationSegment');

var _genericTypeSegment = require('./genericTypeSegment');

var _accessModifierSegment = require('./accessModifierSegment');

var _interfaceImplementationSegment = require('./interfaceImplementationSegment');

var _util = require('./util');

var _methodSegment = require('./methodSegment');

function interfaceNameSegment(name, genericTypes) {
  return '' + name + (0, _genericTypeSegment.genericTypeSegment)(genericTypes);
}

function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function extendsSegment(extendsInterfaces) {
  return extendsInterfaces.length ? ' extends ' + extendsInterfaces.map(_interfaceImplementationSegment.interfaceImplementationSegment).join(', ') : '';
}

function interfaceHeaderSegment(accessModifier, name, genericTypes, scope, extendsInterfaces) {
  return '' + (0, _accessModifierSegment.accessModifierSegment)(accessModifier) + scopeSegment(scope) + ('interface ' + interfaceNameSegment(name, genericTypes) + extendsSegment(extendsInterfaces));
}

function interfaceSegment() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$name = _ref.name;
  var name = _ref$name === undefined ? 'MyInterface' : _ref$name;
  var _ref$extendsInterface = _ref.extendsInterfaces;
  var extendsInterfaces = _ref$extendsInterface === undefined ? [] : _ref$extendsInterface;
  var _ref$genericTypes = _ref.genericTypes;
  var genericTypes = _ref$genericTypes === undefined ? [] : _ref$genericTypes;
  var _ref$accessModifier = _ref.accessModifier;
  var accessModifier = _ref$accessModifier === undefined ? 'public' : _ref$accessModifier;
  var _ref$scope = _ref.scope;
  var scope = _ref$scope === undefined ? 'instance' : _ref$scope;
  var _ref$annotations = _ref.annotations;
  var annotations = _ref$annotations === undefined ? [] : _ref$annotations;
  var _ref$methods = _ref.methods;
  var methods = _ref$methods === undefined ? [] : _ref$methods;

  var interfaceMethods = methods.map(function (m) {
    return Object.assign({}, m, {
      accessModifier: 'package',
      inInterface: true
    });
  });

  return function (_ref2) {
    var t = _ref2.t;
    var indent = _ref2.indent;
    return t(
    // Annotation lines
    annotations.length ? annotations.map(_annotationSegment.annotationSegment) : undefined,

    // Interface Header Declaration
    interfaceHeaderSegment(accessModifier, name, genericTypes, scope, extendsInterfaces) + ' {',

    // Methods
    interfaceMethods.length ? '' : undefined, interfaceMethods.length ? indent((0, _util.interweave)(interfaceMethods.map(_methodSegment.methodSegment))) : undefined, '}');
  };
}