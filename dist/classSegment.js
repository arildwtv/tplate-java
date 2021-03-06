'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classSegment = classSegment;

var _annotationSegment = require('./annotationSegment');

var _constructorSegment = require('./constructorSegment');

var _methodSegment = require('./methodSegment');

var _fieldSegment = require('./fieldSegment');

var _genericTypeSegment = require('./genericTypeSegment');

var _accessModifierSegment = require('./accessModifierSegment');

var _interfaceImplementationSegment = require('./interfaceImplementationSegment');

var _util = require('./util');

function classNameSegment(name, genericTypes) {
  return '' + name + (0, _genericTypeSegment.genericTypeSegment)(genericTypes);
}

function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function extendsSegment() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var type = _ref.type;
  var _ref$genericTypes = _ref.genericTypes;
  var genericTypes = _ref$genericTypes === undefined ? [] : _ref$genericTypes;

  return type ? ' extends ' + type + (0, _genericTypeSegment.genericTypeSegment)(genericTypes) : '';
}

function classHeaderSegment(accessModifier, name, genericTypes, scope, extendsClass) {
  return '' + (0, _accessModifierSegment.accessModifierSegment)(accessModifier) + scopeSegment(scope) + ('class ' + classNameSegment(name, genericTypes) + extendsSegment(extendsClass));
}

function classSegment() {
  var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref2$name = _ref2.name;
  var name = _ref2$name === undefined ? 'MyClass' : _ref2$name;
  var _ref2$extendsClass = _ref2.extendsClass;
  var extendsClass = _ref2$extendsClass === undefined ? undefined : _ref2$extendsClass;
  var _ref2$genericTypes = _ref2.genericTypes;
  var genericTypes = _ref2$genericTypes === undefined ? [] : _ref2$genericTypes;
  var _ref2$accessModifier = _ref2.accessModifier;
  var accessModifier = _ref2$accessModifier === undefined ? 'public' : _ref2$accessModifier;
  var _ref2$scope = _ref2.scope;
  var scope = _ref2$scope === undefined ? 'instance' : _ref2$scope;
  var _ref2$interfaces = _ref2.interfaces;
  var interfaces = _ref2$interfaces === undefined ? [] : _ref2$interfaces;
  var _ref2$annotations = _ref2.annotations;
  var annotations = _ref2$annotations === undefined ? [] : _ref2$annotations;
  var _ref2$fields = _ref2.fields;
  var fields = _ref2$fields === undefined ? [] : _ref2$fields;
  var _ref2$constructors = _ref2.constructors;
  var constructors = _ref2$constructors === undefined ? [] : _ref2$constructors;
  var _ref2$methods = _ref2.methods;
  var methods = _ref2$methods === undefined ? [] : _ref2$methods;
  var _ref2$innerClasses = _ref2.innerClasses;
  var innerClasses = _ref2$innerClasses === undefined ? [] : _ref2$innerClasses;

  var constructorsWithName = constructors.map(function (c) {
    return Object.assign({}, c, { name: name });
  });

  return function (_ref3) {
    var t = _ref3.t;
    var indent = _ref3.indent;
    return t(
    // Annotation lines
    annotations.length ? annotations.map(_annotationSegment.annotationSegment) : undefined,

    // Class Header Declaration
    interfaces.length ? '' + classHeaderSegment(accessModifier, name, genericTypes, scope, extendsClass) : classHeaderSegment(accessModifier, name, genericTypes, scope, extendsClass) + ' {', interfaces.length ? indent('implements ' + interfaces.map(_interfaceImplementationSegment.interfaceImplementationSegment).join(', ') + ' {') : undefined,

    // Field lines
    fields.length ? '' : undefined, fields.length ? indent((0, _util.interweave)(fields.map(_fieldSegment.fieldSegment))) : undefined,

    // Constructors
    constructors.length ? '' : undefined, constructors.length ? indent((0, _util.interweave)(constructorsWithName.map(_constructorSegment.constructorSegment))) : undefined,

    // Methods
    methods.length ? '' : undefined, methods.length ? indent((0, _util.interweave)(methods.map(_methodSegment.methodSegment))) : undefined,

    // Inner classes
    innerClasses.length ? '' : undefined, innerClasses.length ? indent((0, _util.interweave)(innerClasses.map(classSegment))) : undefined, '}');
  };
}