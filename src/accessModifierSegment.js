export function accessModifierSegment(accessModifier) {
  return accessModifier === 'package' ? '' : `${accessModifier} `;
}
