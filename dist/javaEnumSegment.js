'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.javaEnumSegment = javaEnumSegment;

var _javaAnnotationSegment = require('./javaAnnotationSegment');

var _javaConstructorSegment = require('./javaConstructorSegment');

var _javaFieldSegment = require('./javaFieldSegment');

var _javaMethodSegment = require('./javaMethodSegment');

var _javaAccessModifierSegment = require('./javaAccessModifierSegment');

var _javaInterfaceImplementationSegment = require('./javaInterfaceImplementationSegment');

var _util = require('./util');

function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function constantArgumentsSegment(args) {
  return args.join(', ');
}

function constantWithArgumentsSegment(name, args, IS_LAST) {
  return function (_ref) {
    var t = _ref.t;
    var indent = _ref.indent;
    return '' + (args.length === 1 ? t(name + '(' + constantArgumentsSegment(args) + ')') : t(name + '(', indent(args.join(',\n')), ')')) + ('' + (IS_LAST ? ';' : ','));
  };
}

function constantWithoutArgumentsSegment(name, IS_LAST) {
  return '' + name + (IS_LAST ? ';' : ',');
}

function constantSegment() {
  var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var name = _ref2.name;
  var _ref2$args = _ref2.args;
  var args = _ref2$args === undefined ? [] : _ref2$args;
  var _ref2$annotations = _ref2.annotations;
  var annotations = _ref2$annotations === undefined ? [] : _ref2$annotations;

  var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var IS_LAST = _ref3.IS_LAST;

  return function (tplate) {
    var t = tplate.t;

    return t(annotations.length ? annotations.map(_javaAnnotationSegment.javaAnnotationSegment) : undefined, args.length ? constantWithArgumentsSegment(name, args, IS_LAST) : constantWithoutArgumentsSegment(name, IS_LAST));
  };
}

function enumHeaderSegment(accessModifier, scope, name) {
  return '' + (0, _javaAccessModifierSegment.javaAccessModifierSegment)(accessModifier) + scopeSegment(scope) + 'enum ' + name;
}

function javaEnumSegment() {
  var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref4$name = _ref4.name;
  var name = _ref4$name === undefined ? 'MyEnum' : _ref4$name;
  var _ref4$accessModifier = _ref4.accessModifier;
  var accessModifier = _ref4$accessModifier === undefined ? 'public' : _ref4$accessModifier;
  var _ref4$scope = _ref4.scope;
  var scope = _ref4$scope === undefined ? 'instance' : _ref4$scope;
  var _ref4$interfaces = _ref4.interfaces;
  var interfaces = _ref4$interfaces === undefined ? [] : _ref4$interfaces;
  var _ref4$annotations = _ref4.annotations;
  var annotations = _ref4$annotations === undefined ? [] : _ref4$annotations;
  var _ref4$fields = _ref4.fields;
  var fields = _ref4$fields === undefined ? [] : _ref4$fields;
  var _ref4$constants = _ref4.constants;
  var constants = _ref4$constants === undefined ? [] : _ref4$constants;
  var _ref4$constructors = _ref4.constructors;
  var constructors = _ref4$constructors === undefined ? [] : _ref4$constructors;
  var _ref4$methods = _ref4.methods;
  var methods = _ref4$methods === undefined ? [] : _ref4$methods;

  var constructorsWithName = constructors.map(function (c) {
    return Object.assign({}, c, { name: name, accessModifier: 'package' });
  });

  return function (_ref5) {
    var t = _ref5.t;
    var indent = _ref5.indent;
    var map = _ref5.map;
    return t(
    // Annotation lines
    annotations.length ? annotations.map(_javaAnnotationSegment.javaAnnotationSegment) : undefined,

    // Class Declaration
    interfaces.length ? enumHeaderSegment(accessModifier, scope, name) : enumHeaderSegment(accessModifier, scope, name) + ' {', interfaces.length ? indent('implements ' + interfaces.map(_javaInterfaceImplementationSegment.javaInterfaceImplementationSegment).join(', ') + ' {') : undefined,

    // Constant lines
    constants.length ? '' : undefined, constants.length ? '' + indent(map(constants, constantSegment)) : undefined,

    // Field lines
    fields.length ? '' : undefined, fields.length ? indent(fields.map(_javaFieldSegment.javaFieldSegment)) : undefined,

    // Constructors
    constructors.length ? '' : undefined, constructors.length ? indent((0, _util.interweave)(constructorsWithName.map(_javaConstructorSegment.javaConstructorSegment))) : undefined,

    // Methods
    methods.length ? '' : undefined, methods.length ? indent((0, _util.interweave)(methods.map(_javaMethodSegment.javaMethodSegment))) : undefined, '}');
  };
}