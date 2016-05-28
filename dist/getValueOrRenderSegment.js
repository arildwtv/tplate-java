'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getValueOrRenderSegment;
function getValueOrRenderSegment(tplate, value) {
  return typeof value === 'function' ? value(tplate) : value;
}