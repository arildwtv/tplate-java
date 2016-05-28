export function javaAccessModifierSegment(accessModifier) {
  return accessModifier === 'package' ? '' : `${accessModifier} `;
}
