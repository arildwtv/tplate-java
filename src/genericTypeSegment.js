export function genericTypeSegment(genericTypes = []) {
  return genericTypes.length
    ? `<${genericTypes.map(innerGenericTypeSegment).join(', ')}>`
    : '';
}

function innerGenericTypeSegment({ type, extendsType, genericTypes }) {
  return extendsType
    ? `${type} extends ${innerGenericTypeSegment(extendsType)}`
    : `${type}${genericTypeSegment(genericTypes)}`;
}
