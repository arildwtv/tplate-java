'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.javaInterfaceSegment = javaInterfaceSegment;

var _javaAnnotationSegment = require('./javaAnnotationSegment');

var _javaGenericTypeSegment = require('./javaGenericTypeSegment');

var _javaAccessModifierSegment = require('./javaAccessModifierSegment');

var _javaInterfaceImplementationSegment = require('./javaInterfaceImplementationSegment');

var _util = require('./util');

var _javaMethodSegment = require('./javaMethodSegment');

function interfaceNameSegment(name, genericTypes) {
  return '' + name + (0, _javaGenericTypeSegment.javaGenericTypeSegment)(genericTypes);
}

function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function extendsSegment(extendsInterfaces) {
  return extendsInterfaces.length ? ' extends ' + extendsInterfaces.map(_javaInterfaceImplementationSegment.javaInterfaceImplementationSegment).join(', ') : '';
}

function interfaceHeaderSegment(accessModifier, name, genericTypes, scope, extendsInterfaces) {
  return '' + (0, _javaAccessModifierSegment.javaAccessModifierSegment)(accessModifier) + scopeSegment(scope) + ('interface ' + interfaceNameSegment(name, genericTypes) + extendsSegment(extendsInterfaces));
}

function javaInterfaceSegment() {
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
    annotations.length ? annotations.map(_javaAnnotationSegment.javaAnnotationSegment) : undefined,

    // Interface Header Declaration
    interfaceHeaderSegment(accessModifier, name, genericTypes, scope, extendsInterfaces) + ' {',

    // Methods
    interfaceMethods.length ? '' : undefined, interfaceMethods.length ? indent((0, _util.interweave)(interfaceMethods.map(_javaMethodSegment.javaMethodSegment))) : undefined, '}');
  };
}