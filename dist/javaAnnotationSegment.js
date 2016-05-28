'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.javaAnnotationSegment = javaAnnotationSegment;
function getValue(tplate, value) {
  return typeof value === 'function' ? value(tplate) : value;
}

function javaAnnotationWithoutParameters(_ref, name) {
  var t = _ref.t;

  return t('@' + name);
}

function javaAnnotationWithParameters(tplate, name, args) {
  var t = tplate.t;
  var indent = tplate.indent;

  return args.length === 1 && args[0].name === 'value' ? t('@' + name + '(' + getValue(tplate, args[0].value) + ')') : t('@' + name + '(', indent(args.map(function (arg) {
    return arg.name + ' = ' + getValue(tplate, arg.value);
  }).join(',\n')), ')');
}

function javaAnnotationSegment() {
  var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref2$name = _ref2.name;
  var name = _ref2$name === undefined ? 'Annotation' : _ref2$name;
  var _ref2$args = _ref2.args;
  var args = _ref2$args === undefined ? [] : _ref2$args;
  var value = _ref2.value;

  if (typeof value !== 'undefined' && args.length === 0) {
    args.push({ name: 'value', value: value });
  }

  return function (tplate) {
    return args.length === 0 ? javaAnnotationWithoutParameters(tplate, name) : javaAnnotationWithParameters(tplate, name, args);
  };
}