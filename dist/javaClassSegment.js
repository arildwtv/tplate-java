'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.javaClassSegment = javaClassSegment;

var _javaAnnotationSegment = require('./javaAnnotationSegment');

var _javaConstructorSegment = require('./javaConstructorSegment');

var _javaMethodSegment = require('./javaMethodSegment');

var _javaFieldSegment = require('./javaFieldSegment');

var _javaGenericTypeSegment = require('./javaGenericTypeSegment');

var _javaAccessModifierSegment = require('./javaAccessModifierSegment');

var _util = require('./util');

function classNameSegment(name, genericTypes) {
  return '' + name + (0, _javaGenericTypeSegment.javaGenericTypeSegment)(genericTypes);
}

function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function extendsSegment() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var name = _ref.name;
  var _ref$genericTypes = _ref.genericTypes;
  var genericTypes = _ref$genericTypes === undefined ? [] : _ref$genericTypes;

  return name ? ' extends ' + name + (0, _javaGenericTypeSegment.javaGenericTypeSegment)(genericTypes) : '';
}

function interfaceSegment(_ref2) {
  var name = _ref2.name;
  var _ref2$genericTypes = _ref2.genericTypes;
  var genericTypes = _ref2$genericTypes === undefined ? [] : _ref2$genericTypes;

  return '' + name + (0, _javaGenericTypeSegment.javaGenericTypeSegment)(genericTypes);
}

function classHeaderSegment(accessModifier, name, genericTypes, scope, extendsClass) {
  return '' + (0, _javaAccessModifierSegment.javaAccessModifierSegment)(accessModifier) + scopeSegment(scope) + ('class ' + classNameSegment(name, genericTypes) + extendsSegment(extendsClass));
}

function javaClassSegment() {
  var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref3$name = _ref3.name;
  var name = _ref3$name === undefined ? 'MyClass' : _ref3$name;
  var _ref3$extendsClass = _ref3.extendsClass;
  var extendsClass = _ref3$extendsClass === undefined ? undefined : _ref3$extendsClass;
  var _ref3$genericTypes = _ref3.genericTypes;
  var genericTypes = _ref3$genericTypes === undefined ? [] : _ref3$genericTypes;
  var _ref3$accessModifier = _ref3.accessModifier;
  var accessModifier = _ref3$accessModifier === undefined ? 'public' : _ref3$accessModifier;
  var _ref3$scope = _ref3.scope;
  var scope = _ref3$scope === undefined ? 'instance' : _ref3$scope;
  var _ref3$interfaces = _ref3.interfaces;
  var interfaces = _ref3$interfaces === undefined ? [] : _ref3$interfaces;
  var _ref3$annotations = _ref3.annotations;
  var annotations = _ref3$annotations === undefined ? [] : _ref3$annotations;
  var _ref3$fields = _ref3.fields;
  var fields = _ref3$fields === undefined ? [] : _ref3$fields;
  var _ref3$constructors = _ref3.constructors;
  var constructors = _ref3$constructors === undefined ? [] : _ref3$constructors;
  var _ref3$methods = _ref3.methods;
  var methods = _ref3$methods === undefined ? [] : _ref3$methods;
  var _ref3$innerClasses = _ref3.innerClasses;
  var innerClasses = _ref3$innerClasses === undefined ? [] : _ref3$innerClasses;

  var constructorsWithName = constructors.map(function (c) {
    return Object.assign({}, c, { name: name });
  });

  return function (_ref4) {
    var t = _ref4.t;
    var indent = _ref4.indent;
    return t(
    // Annotation lines
    annotations.length ? annotations.map(_javaAnnotationSegment.javaAnnotationSegment) : undefined,

    // Class Header Declaration
    interfaces.length ? '' + classHeaderSegment(accessModifier, name, genericTypes, scope, extendsClass) : classHeaderSegment(accessModifier, name, genericTypes, scope, extendsClass) + ' {', interfaces.length ? indent('implements ' + interfaces.map(interfaceSegment).join(', ') + ' {') : undefined,

    // Field lines
    fields.length ? '' : undefined, fields.length ? indent(fields.map(_javaFieldSegment.javaFieldSegment)) : undefined,

    // Constructors
    constructors.length ? '' : undefined, constructors.length ? indent((0, _util.interweave)(constructorsWithName.map(_javaConstructorSegment.javaConstructorSegment))) : undefined,

    // Methods
    methods.length ? '' : undefined, methods.length ? indent((0, _util.interweave)(methods.map(_javaMethodSegment.javaMethodSegment))) : undefined,

    // Inner classes
    innerClasses.length ? '' : undefined, innerClasses.length ? indent((0, _util.interweave)(innerClasses.map(javaClassSegment))) : undefined, '}');
  };
}