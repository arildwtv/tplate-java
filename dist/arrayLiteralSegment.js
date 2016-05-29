'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayLiteralSegment = arrayLiteralSegment;
function arrayLiteralSegment(array) {
  return function (tplate) {
    var t = tplate.t;
    var indent = tplate.indent;

    return t('{', indent(array.map(function (item) {
      return typeof item === 'function' ? item(tplate) : item;
    }).join(',\n')), '}');
  };
}