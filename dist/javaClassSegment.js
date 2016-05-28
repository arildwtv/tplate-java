'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.javaClassSegment = javaClassSegment;

var _javaAnnotationSegment = require('./javaAnnotationSegment');

var _javaConstructorSegment = require('./javaConstructorSegment');

var _javaMethodSegment = require('./javaMethodSegment');

var _javaGenericTypeSegment = require('./javaGenericTypeSegment');

function getValue(tplate, value) {
  return typeof value === 'function' ? value(tplate) : value;
}

function interweave(array) {
  var interweaveItem = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  var interwovenArray = array.reduce(function (prevArray, item) {
    return prevArray.concat(item, interweaveItem);
  }, []);
  interwovenArray.pop();
  return interwovenArray;
}

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

function classFieldSegment() {
  var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref3$accessModifier = _ref3.accessModifier;
  var accessModifier = _ref3$accessModifier === undefined ? 'private' : _ref3$accessModifier;
  var _ref3$scope = _ref3.scope;
  var scope = _ref3$scope === undefined ? 'instance' : _ref3$scope;
  var _ref3$final = _ref3.final;
  var final = _ref3$final === undefined ? true : _ref3$final;
  var _ref3$type = _ref3.type;
  var type = _ref3$type === undefined ? 'String' : _ref3$type;
  var _ref3$genericTypes = _ref3.genericTypes;
  var genericTypes = _ref3$genericTypes === undefined ? [] : _ref3$genericTypes;
  var name = _ref3.name;
  var assign = _ref3.assign;

  var scopeString = scope === 'class' ? ' static' : '';
  var finalString = final ? ' final' : '';
  return function (tplate) {
    var t = tplate.t;

    var assignString = assign ? ' = ' + getValue(tplate, assign) : '';
    return t('' + accessModifier + scopeString + finalString + ' ' + ('' + type + (0, _javaGenericTypeSegment.javaGenericTypeSegment)(genericTypes) + ' ' + name + assignString + ';'));
  };
}

function javaClassSegment() {
  var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref4$name = _ref4.name;
  var name = _ref4$name === undefined ? 'MyClass' : _ref4$name;
  var _ref4$extendsClass = _ref4.extendsClass;
  var extendsClass = _ref4$extendsClass === undefined ? undefined : _ref4$extendsClass;
  var _ref4$genericTypes = _ref4.genericTypes;
  var genericTypes = _ref4$genericTypes === undefined ? [] : _ref4$genericTypes;
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
  var _ref4$constructors = _ref4.constructors;
  var constructors = _ref4$constructors === undefined ? [] : _ref4$constructors;
  var _ref4$methods = _ref4.methods;
  var methods = _ref4$methods === undefined ? [] : _ref4$methods;
  var _ref4$innerClasses = _ref4.innerClasses;
  var innerClasses = _ref4$innerClasses === undefined ? [] : _ref4$innerClasses;

  var constructorsWithName = constructors.map(function (c) {
    return Object.assign({}, c, { name: name });
  });

  return function (_ref5) {
    var t = _ref5.t;
    var indent = _ref5.indent;
    return t(
    // Annotation lines
    annotations.length ? annotations.map(_javaAnnotationSegment.javaAnnotationSegment) : undefined,

    // Class Declaration
    interfaces.length ? accessModifier + ' ' + scopeSegment(scope) + 'class ' + classNameSegment(name, genericTypes) + ('' + extendsSegment(extendsClass)) : accessModifier + ' ' + scopeSegment(scope) + 'class ' + classNameSegment(name, genericTypes) + (extendsSegment(extendsClass) + ' {'), interfaces.length ? indent('implements ' + interfaces.map(interfaceSegment).join(', ') + ' {') : undefined,

    // Field lines
    fields.length ? '' : undefined, fields.length ? indent(fields.map(classFieldSegment)) : undefined,

    // Constructors
    constructors.length ? '' : undefined, constructors.length ? indent(interweave(constructorsWithName.map(_javaConstructorSegment.javaConstructorSegment))) : undefined,

    // Methods
    methods.length ? '' : undefined, methods.length ? indent(interweave(methods.map(_javaMethodSegment.javaMethodSegment))) : undefined,

    // Inner classes
    innerClasses.length ? '' : undefined, innerClasses.length ? indent(interweave(innerClasses.map(javaClassSegment))) : undefined, '}');
  };
}