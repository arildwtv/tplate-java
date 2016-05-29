'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessModifierSegment = accessModifierSegment;
function accessModifierSegment(accessModifier) {
  return accessModifier === 'package' ? '' : accessModifier + ' ';
}