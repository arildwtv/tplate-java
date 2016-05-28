'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.javaEnumSegment = javaEnumSegment;

var _javaAnnotationSegment = require('./javaAnnotationSegment');

var _javaConstructorSegment = require('./javaConstructorSegment');

var _javaFieldSegment = require('./javaFieldSegment');

var _javaMethodSegment = require('./javaMethodSegment');

var _javaGenericTypeSegment = require('./javaGenericTypeSegment');

var _javaAccessModifierSegment = require('./javaAccessModifierSegment');

var _util = require('./util');

function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function interfaceSegment(_ref) {
  var name = _ref.name;
  var _ref$genericTypes = _ref.genericTypes;
  var genericTypes = _ref$genericTypes === undefined ? [] : _ref$genericTypes;

  return '' + name + (0, _javaGenericTypeSegment.javaGenericTypeSegment)(genericTypes);
}

function constantArgumentsSegment(args) {
  return args.join(', ');
}

function constantWithArgumentsSegment(name, args, IS_LAST) {
  return function (_ref2) {
    var t = _ref2.t;
    var indent = _ref2.indent;
    return '' + (args.length === 1 ? t(name + '(' + constantArgumentsSegment(args) + ')') : t(name + '(', indent(args.join(',\n')), ')')) + ('' + (IS_LAST ? ';' : ','));
  };
}

function constantWithoutArgumentsSegment(name, IS_LAST) {
  return '' + name + (IS_LAST ? ';' : ',');
}

function constantSegment() {
  var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var name = _ref3.name;
  var _ref3$args = _ref3.args;
  var args = _ref3$args === undefined ? [] : _ref3$args;
  var _ref3$annotations = _ref3.annotations;
  var annotations = _ref3$annotations === undefined ? [] : _ref3$annotations;

  var _ref4 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var IS_LAST = _ref4.IS_LAST;

  return function (tplate) {
    var t = tplate.t;

    return t(annotations.length ? annotations.map(_javaAnnotationSegment.javaAnnotationSegment) : undefined, args.length ? constantWithArgumentsSegment(name, args, IS_LAST) : constantWithoutArgumentsSegment(name, IS_LAST));
  };
}

function enumHeaderSegment(accessModifier, scope, name) {
  return '' + (0, _javaAccessModifierSegment.javaAccessModifierSegment)(accessModifier) + scopeSegment(scope) + 'enum ' + name;
}

function javaEnumSegment() {
  var _ref5 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref5$name = _ref5.name;
  var name = _ref5$name === undefined ? 'MyEnum' : _ref5$name;
  var _ref5$accessModifier = _ref5.accessModifier;
  var accessModifier = _ref5$accessModifier === undefined ? 'public' : _ref5$accessModifier;
  var _ref5$scope = _ref5.scope;
  var scope = _ref5$scope === undefined ? 'instance' : _ref5$scope;
  var _ref5$interfaces = _ref5.interfaces;
  var interfaces = _ref5$interfaces === undefined ? [] : _ref5$interfaces;
  var _ref5$annotations = _ref5.annotations;
  var annotations = _ref5$annotations === undefined ? [] : _ref5$annotations;
  var _ref5$fields = _ref5.fields;
  var fields = _ref5$fields === undefined ? [] : _ref5$fields;
  var _ref5$constants = _ref5.constants;
  var constants = _ref5$constants === undefined ? [] : _ref5$constants;
  var _ref5$constructors = _ref5.constructors;
  var constructors = _ref5$constructors === undefined ? [] : _ref5$constructors;
  var _ref5$methods = _ref5.methods;
  var methods = _ref5$methods === undefined ? [] : _ref5$methods;

  var constructorsWithName = constructors.map(function (c) {
    return Object.assign({}, c, { name: name, accessModifier: 'package' });
  });

  return function (_ref6) {
    var t = _ref6.t;
    var indent = _ref6.indent;
    var map = _ref6.map;
    return t(
    // Annotation lines
    annotations.length ? annotations.map(_javaAnnotationSegment.javaAnnotationSegment) : undefined,

    // Class Declaration
    interfaces.length ? enumHeaderSegment(accessModifier, scope, name) : enumHeaderSegment(accessModifier, scope, name) + ' {', interfaces.length ? indent('implements ' + interfaces.map(interfaceSegment).join(', ') + ' {') : undefined,

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