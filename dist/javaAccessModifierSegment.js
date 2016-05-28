'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.javaAccessModifierSegment = javaAccessModifierSegment;
function javaAccessModifierSegment(accessModifier) {
  return accessModifier === 'package' ? '' : accessModifier + ' ';
}