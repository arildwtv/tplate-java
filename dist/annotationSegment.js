'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.annotationSegment = annotationSegment;
function getValue(tplate, value) {
  return typeof value === 'function' ? value(tplate) : value;
}

function annotationWithoutParameters(_ref, type) {
  var t = _ref.t;

  return t('@' + type);
}

function annotationWithParameters(tplate, type, args) {
  var t = tplate.t;
  var indent = tplate.indent;

  return args.length === 1 && args[0].name === 'value' ? t('@' + type + '(' + getValue(tplate, args[0].value) + ')') : t('@' + type + '(', indent(args.map(function (arg) {
    return arg.name + ' = ' + getValue(tplate, arg.value);
  }).join(',\n')), ')');
}

function annotationSegment() {
  var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref2$type = _ref2.type;
  var type = _ref2$type === undefined ? 'Annotation' : _ref2$type;
  var _ref2$args = _ref2.args;
  var args = _ref2$args === undefined ? [] : _ref2$args;
  var value = _ref2.value;

  if (typeof value !== 'undefined' && args.length === 0) {
    args.push({ name: 'value', value: value });
  }

  return function (tplate) {
    return args.length === 0 ? annotationWithoutParameters(tplate, type) : annotationWithParameters(tplate, type, args);
  };
}